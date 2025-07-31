import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind CSSを適用するファイルを指定
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // デザインのカスタム設定を記述する場所
  theme: {
    extend: {
      // 例: カスタムカラーやフォントサイズを追加
      // colors: {
      //   primary: '#0070f3',
      // },
    },
  },
  // プラグインを追加する場所
  plugins: [],
};

export default config;
