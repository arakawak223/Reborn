interface Env {
  COEFONT_ACCESS_KEY: string;
  COEFONT_CLIENT_SECRET: string;
  ALLOWED_ORIGIN: string; // e.g. "https://your-site.com" or "*"
}

const COEFONT_API_URL = "https://api.coefont.cloud/v2/text2speech";

async function hmacSign(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN || "*";
    const headers = corsHeaders(origin);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    try {
      const body = await request.json() as Record<string, unknown>;

      // Build the CoeFont API request body
      const coefontBody = JSON.stringify(body);

      // Generate HMAC-SHA256 signature (CoeFont expects Unix timestamp)
      const date = String(Math.floor(Date.now() / 1000));
      const signPayload = date + coefontBody;
      const signature = await hmacSign(env.COEFONT_CLIENT_SECRET, signPayload);

      // Call CoeFont API (manual redirect to avoid Authorization header leaking to S3)
      const response = await fetch(COEFONT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: env.COEFONT_ACCESS_KEY,
          "X-Coefont-Date": date,
          "X-Coefont-Content": signature,
        },
        body: coefontBody,
        redirect: "manual",
      });

      // Follow redirect without Authorization header
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("Location");
        if (location) {
          const audioResponse = await fetch(location);
          if (!audioResponse.ok) {
            return new Response(
              JSON.stringify({ error: "Audio fetch error", status: audioResponse.status }),
              { status: audioResponse.status, headers: { ...headers, "Content-Type": "application/json" } },
            );
          }
          const audioData = await audioResponse.arrayBuffer();
          return new Response(audioData, {
            status: 200,
            headers: { ...headers, "Content-Type": "audio/wav", "Cache-Control": "public, max-age=3600" },
          });
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        return new Response(
          JSON.stringify({ error: "CoeFont API error", status: response.status, detail: errorText }),
          {
            status: response.status,
            headers: { ...headers, "Content-Type": "application/json" },
          },
        );
      }

      // Return the WAV binary with CORS headers
      const audioData = await response.arrayBuffer();
      return new Response(audioData, {
        status: 200,
        headers: {
          ...headers,
          "Content-Type": "audio/wav",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
