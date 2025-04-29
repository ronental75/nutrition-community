// tailwind.config.js

// module.exports = {
//     theme: {
//       extend: {
//         fontFamily: {
//           sans: ['"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
//         },
//         colors: {
//           gray: {
//             900: '#111827',
//             800: '#1f2937',
//           },
//           blue: {
//             600: '#2563eb',
//           },
//         },
//       },
//     },
//     variants: {},
//     plugins: [],
//   };
  

 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{html,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}