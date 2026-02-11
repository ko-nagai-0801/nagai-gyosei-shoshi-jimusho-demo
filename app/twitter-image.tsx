import { ImageResponse } from "next/og";
export const size = {
  width: 1200,
  height: 675,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(120deg, rgb(15, 54, 88) 0%, rgb(193, 138, 54) 150%)",
          color: "white",
          padding: "72px",
        }}
      >
        <p style={{ fontSize: 24, letterSpacing: "0.12em", opacity: 0.9 }}>
          NAGAI GYOUSEI SHOSHI OFFICE
        </p>
        <h1 style={{ marginTop: 20, fontSize: 60, lineHeight: 1.3 }}>
          永井行政書士事務所
          <br />
          申請手続きを丁寧にサポート
        </h1>
      </div>
    ),
    size,
  );
}
