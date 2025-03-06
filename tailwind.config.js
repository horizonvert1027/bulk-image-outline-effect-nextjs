/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'static-image': "url('/images/content/functions/bg_function.webp')",
        'no-subscription': "url('/images/content/squared-bg-element.svg')",
        'no-subscription-dark': "url('/images/content/squared-bg-element-dark.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('preline/plugin'),
    // require('daisyui'),
  ],
  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         ...require("daisyui/src/theming/themes")["light"],
  //         primary: "#4833FF",
  //       },
  //     },
  //   ],
  // },
};
