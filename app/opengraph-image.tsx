import { ImageResponse } from "next/og";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "linear-gradient(120deg, rgb(15, 54, 88) 0%, rgb(38, 84, 122) 60%, rgb(193, 138, 54) 160%)",
          color: "white",
          padding: "80px",
        }}
      >
        <p style={{ fontSize: 28, letterSpacing: "0.14em", opacity: 0.9 }}>
          NAGAI GYOUSEI SHOSHI OFFICE
        </p>
        <h1 style={{ marginTop: 24, fontSize: 64, lineHeight: 1.25 }}>
          永井行政書士事務所
          <br />
          建設業許可・在留資格・法人設立
        </h1>
      </div>
    ),
    size,
  );
}
