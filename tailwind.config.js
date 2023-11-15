/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cdc79b',
        secondary: '#1a1601',
        codeblocks: '#282A36'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#cdc79b',
          "primary-content": '#0E0D07',
          secondary: '#1a1601',
          "secondary-content": "#e7e5e4",
          codeblocks: '#282A36',
          
        }
      }
    ]
  }
}
