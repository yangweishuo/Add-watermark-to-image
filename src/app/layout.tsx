import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "图片水印工具",
  description: "支持批量处理、多种水印样式、防伪水印等功能的在线图片水印工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
