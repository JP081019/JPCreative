import sharp from "sharp";
import { writeFileSync } from "node:fs";

// Extract the supplied official symbol; no geometry or letterforms are recreated.
const icon = await sharp("public/Logo JPCreative/Logo Minimalista JP Creative.png")
  .extract({ left: 260, top: 280, width: 690, height: 450 })
  .resize(64, 64, { fit: "contain", background: "#f6f6f2" })
  .ensureAlpha().png().toBuffer();
// ICO containing a PNG image is supported by modern browsers.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(64, 6);
header.writeUInt8(64, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(icon.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync("app/favicon.ico", Buffer.concat([header, icon]));
console.log("Official JP Creative symbol prepared as favicon.");
