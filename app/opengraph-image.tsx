import { ImageResponse } from "next/og";

export const alt = "JP Creative — Construímos o próximo nível.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 72px", color: "#16191B", background: "#F6F6F2", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 24 }}>JP Creative / Agência Digital</div><div style={{ display: "flex", flexDirection: "column", fontSize: 98, letterSpacing: "-6px", lineHeight: 1.04 }}><span>Construímos</span><span>o próximo nível.</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#555E58", borderTop: "1px solid #CDD1CA", paddingTop: 24 }}><span>Estratégia / Design / Tecnologia</span><span>Impact + Evolve</span></div></div>, size);
}
