// RE:BORN Service Worker
const CACHE_NAME = "reborn-v1";
const BASE_PATH = "/Reborn";

// ビルド時に生成される静的アセットは precache しない（量が動的なため）
// 代わりに runtime caching で対応する

self.addEventListener("install", (event) => {
  // 新しい SW を即座にアクティブにする
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // 古いキャッシュを削除
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同一オリジンのリクエストのみ処理
  if (url.origin !== self.location.origin) return;

  // basePath 配下のみキャッシュ
  if (!url.pathname.startsWith(BASE_PATH)) return;

  // HTML (ナビゲーション): Network-first
  // → オンラインなら最新を取得、オフラインならキャッシュ
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 静的アセット (JS, CSS, フォント, 画像, SVG): Cache-first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }

  // メディア (BGM, 動画): Cache-first（大きいのでストリーミング対応）
  if (isMediaAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            // 成功レスポンスのみキャッシュ
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // その他: Network-first（フォールバック付き）
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});

function isStaticAsset(pathname) {
  return /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|gif|webp|avif|svg|ico)$/i.test(pathname);
}

function isMediaAsset(pathname) {
  return /\.(?:mp3|wav|ogg|mp4|webm)$/i.test(pathname);
}
