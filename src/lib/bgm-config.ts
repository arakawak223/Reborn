// BGM configuration: maps routes to audio files

const BASE = "/Reborn/BGM";

/** Top page BGM */
export const TOP_BGM = `${BASE}/355_BPM128.mp3`;

/** Available athlete BGM tracks (excluding the top page track) */
const ATHLETE_TRACKS = [
  `${BASE}/An Interview - Short 1.wav`,
  `${BASE}/Back-to-School.mp3`,
  `${BASE}/Broadcast.mp3`,
  `${BASE}/Corporate-Uplifting.mp3`,
  `${BASE}/Education.mp3`,
  `${BASE}/Happy-Birthday.mp3`,
  `${BASE}/Makeup.mp3`,
  `${BASE}/Productivity.mp3`,
];

/** All athlete IDs in display order */
const ATHLETE_IDS = [
  "mcmorris", "hirano", "okamoto", "ohtani", "murray",
  "kunieda", "ikee", "woods", "mitoma", "abe",
  "kimura", "sanibrawn", "ito", "toratani", "durant",
  "takahashi_ran", "leitch", "irie", "kasai", "tanaka",
  "ishikawa", "yamamoto", "fukuhara", "inoue", "kunieda_v2",
  "kimura_v2", "tani", "murata", "watanabe", "akiyama",
  "uchimura", "tomita", "sato_mami", "zanardi", "eriksen",
  "yamasaki", "hanyu", "endo", "ueno", "nishikori",
];

/** Athlete ID -> BGM track mapping (cycles through available tracks) */
const athleteBgmMap: Record<string, string> = {};
ATHLETE_IDS.forEach((id, i) => {
  athleteBgmMap[id] = ATHLETE_TRACKS[i % ATHLETE_TRACKS.length];
});

/**
 * Determine which BGM to play based on the current pathname.
 * Returns the audio file path, or null if no BGM should play.
 */
export function getBgmForPath(pathname: string): string {
  // Strip basePath prefix if present
  const path = pathname.replace(/^\/Reborn/, "") || "/";

  // Athlete pages: /athletes/{id} or /athletes/{id}/story etc.
  const match = path.match(/^\/athletes\/([^/]+)/);
  if (match) {
    const athleteId = match[1];
    return athleteBgmMap[athleteId] ?? ATHLETE_TRACKS[0];
  }

  // Top page and everything else
  return TOP_BGM;
}
