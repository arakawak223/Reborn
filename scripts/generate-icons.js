/**
 * PWAアイコン生成スクリプト
 * Usage: node scripts/generate-icons.js
 *
 * Canvas を使って RE:BORN のシンプルなアイコンを生成する
 * 本番用にはデザイナー作成のアイコンに差し替え推奨
 */

const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const sizes = [192, 512];
const outDir = path.join(__dirname, "..", "public", "icons");

function drawIcon(size, maskable = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 背景
  ctx.fillStyle = "#05050a";
  if (maskable) {
    // maskable: 全面塗り
    ctx.fillRect(0, 0, size, size);
  } else {
    // 角丸
    const r = size * 0.15;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();
  }

  // "RE:" テキスト (白)
  const fontSize = size * 0.2;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#e8e8f0";
  ctx.fillText("RE:", size / 2, size * 0.35);

  // "BORN" テキスト (赤→オレンジのグラデーション風)
  const gradFontSize = size * 0.22;
  ctx.font = `bold ${gradFontSize}px sans-serif`;
  const grad = ctx.createLinearGradient(
    size * 0.2, size * 0.55,
    size * 0.8, size * 0.55
  );
  grad.addColorStop(0, "#ef4444");
  grad.addColorStop(1, "#f97316");
  ctx.fillStyle = grad;
  ctx.fillText("BORN", size / 2, size * 0.62);

  return canvas.toBuffer("image/png");
}

for (const size of sizes) {
  const buf = drawIcon(size, false);
  fs.writeFileSync(path.join(outDir, `icon-${size}.png`), buf);
  console.log(`Generated icon-${size}.png`);
}

// maskable版 (512のみ)
const maskBuf = drawIcon(512, true);
fs.writeFileSync(path.join(outDir, "icon-maskable-512.png"), maskBuf);
console.log("Generated icon-maskable-512.png");
