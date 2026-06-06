/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 💡 ウチらが作った src フォルダの中身を全部スキャンしてスタイルを適用するよ！
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
