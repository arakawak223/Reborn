const UNSPLASH_BASE = "https://images.unsplash.com/";

// スポーツ→Unsplash画像URLマッピング
const SPORT_IMAGE_MAP: Record<string, string> = {
  // Snow: Snowboard, Ski Jump
  スノーボード: `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,
  パラスノーボード: `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,
  スキージャンプ: `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,
  Snowboard: `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,
  "Para Snowboard": `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,
  "Ski Jumping": `${UNSPLASH_BASE}photo-1723065456702-c4353e92e905?w=800&q=80`,

  // Football / Rugby
  サッカー: `${UNSPLASH_BASE}photo-1694866839396-fafc76941831?w=800&q=80`,
  ラグビー: `${UNSPLASH_BASE}photo-1694866839396-fafc76941831?w=800&q=80`,
  Football: `${UNSPLASH_BASE}photo-1694866839396-fafc76941831?w=800&q=80`,
  Soccer: `${UNSPLASH_BASE}photo-1694866839396-fafc76941831?w=800&q=80`,
  Rugby: `${UNSPLASH_BASE}photo-1694866839396-fafc76941831?w=800&q=80`,

  // Basketball
  バスケットボール: `${UNSPLASH_BASE}photo-1674062313456-33d7148ac026?w=800&q=80`,
  車いすバスケットボール: `${UNSPLASH_BASE}photo-1674062313456-33d7148ac026?w=800&q=80`,
  Basketball: `${UNSPLASH_BASE}photo-1674062313456-33d7148ac026?w=800&q=80`,
  "Wheelchair Basketball": `${UNSPLASH_BASE}photo-1674062313456-33d7148ac026?w=800&q=80`,

  // Swimming
  水泳: `${UNSPLASH_BASE}photo-1689307182528-2f368d955c5d?w=800&q=80`,
  パラ水泳: `${UNSPLASH_BASE}photo-1689307182528-2f368d955c5d?w=800&q=80`,
  Swimming: `${UNSPLASH_BASE}photo-1689307182528-2f368d955c5d?w=800&q=80`,
  "Para Swimming": `${UNSPLASH_BASE}photo-1689307182528-2f368d955c5d?w=800&q=80`,

  // Baseball / Softball
  野球: `${UNSPLASH_BASE}photo-1431817986760-7cc7fbb937b2?w=800&q=80`,
  ソフトボール: `${UNSPLASH_BASE}photo-1431817986760-7cc7fbb937b2?w=800&q=80`,
  Baseball: `${UNSPLASH_BASE}photo-1431817986760-7cc7fbb937b2?w=800&q=80`,
  Softball: `${UNSPLASH_BASE}photo-1431817986760-7cc7fbb937b2?w=800&q=80`,

  // Tennis / Table Tennis
  テニス: `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,
  車いすテニス: `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,
  卓球: `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,
  Tennis: `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,
  "Wheelchair Tennis": `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,
  "Table Tennis": `${UNSPLASH_BASE}photo-1468866576576-de8a9bf61f92?w=800&q=80`,

  // Boxing / Judo / Fencing
  ボクシング: `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,
  柔道: `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,
  車いすフェンシング: `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,
  Boxing: `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,
  Judo: `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,
  "Wheelchair Fencing": `${UNSPLASH_BASE}photo-1681400614910-2e80fa375521?w=800&q=80`,

  // Track & Field
  陸上: `${UNSPLASH_BASE}photo-1664304940181-88906d4fb0ae?w=800&q=80`,
  マラソン: `${UNSPLASH_BASE}photo-1664304940181-88906d4fb0ae?w=800&q=80`,
  "Track & Field": `${UNSPLASH_BASE}photo-1664304940181-88906d4fb0ae?w=800&q=80`,
  Marathon: `${UNSPLASH_BASE}photo-1664304940181-88906d4fb0ae?w=800&q=80`,
  "Para Triathlon / Para Athletics": `${UNSPLASH_BASE}photo-1664304940181-88906d4fb0ae?w=800&q=80`,

  // Figure Skating
  フィギュアスケート: `${UNSPLASH_BASE}photo-1701361172842-b132f9b09948?w=800&q=80`,
  "Figure Skating": `${UNSPLASH_BASE}photo-1701361172842-b132f9b09948?w=800&q=80`,

  // Golf
  ゴルフ: `${UNSPLASH_BASE}photo-1688487502503-ae289dcb0178?w=800&q=80`,
  Golf: `${UNSPLASH_BASE}photo-1688487502503-ae289dcb0178?w=800&q=80`,

  // Stadium: Volleyball, Gymnastics, Motorsport
  バレーボール: `${UNSPLASH_BASE}photo-1549333580-4cb2c5c8e421?w=800&q=80`,
  体操: `${UNSPLASH_BASE}photo-1549333580-4cb2c5c8e421?w=800&q=80`,
  Volleyball: `${UNSPLASH_BASE}photo-1549333580-4cb2c5c8e421?w=800&q=80`,
  Gymnastics: `${UNSPLASH_BASE}photo-1549333580-4cb2c5c8e421?w=800&q=80`,
  "Motorsport / Handcycling": `${UNSPLASH_BASE}photo-1549333580-4cb2c5c8e421?w=800&q=80`,
};

// デフォルト: スタジアムライト
const DEFAULT_IMAGE = `${UNSPLASH_BASE}photo-1760278443520-a2f196d8c32f?w=800&q=80`;

/**
 * スポーツ名から対応するフリー素材画像URLを返す
 * 部分一致でキーワードマッチし、見つからない場合はデフォルト画像を返す
 */
export function getSportImage(sport: string): string {
  // 完全一致
  if (SPORT_IMAGE_MAP[sport]) {
    return SPORT_IMAGE_MAP[sport];
  }

  // 部分一致: スポーツ名にキーワードが含まれているかチェック
  for (const [key, url] of Object.entries(SPORT_IMAGE_MAP)) {
    if (sport.includes(key) || key.includes(sport)) {
      return url;
    }
  }

  return DEFAULT_IMAGE;
}
