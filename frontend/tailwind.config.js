/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        'kaushan':['"Kaushan Script"','cursive'],
        'NotoSansJP':['"Noto Sans JP"','sans-serif'],
        'OpenSans':['"Open Sans"','sans-serif'],
        'CentraNo2':['"Centra No2"','sans-serif'],
        'Poppins':['Poppins','sans-serif'],
      },
      backgroundImage: {
        'dark_wave': "url('./src/assets/images/theme/admin_wave_dark_mode.png')",
        'light_wave': "url('./src/assets/images/theme/admin_wave_light_mode.png')",
        'dark_avatar':"url('./src/assets/images/theme/admin_avatar_dark_mode.svg')",
        'light_avatar':"url('./src/assets/images/theme/admin_avatar_light_mode.svg')",
        'dark_login':"url('./src/assets/images/theme/admin_login_dark_mode.svg')",
        'light_login':"url('./src/assets/images/theme/admin_login_light_mode.svg')",
        'light':"url('./assets/images/theme/bg_light.jpg')",
        "light-2":"url('./assets/images/theme/bg_light_2.jpg')", 
        "light-3":"url('./assets/images/theme/bg_light_3.jpg')", 
        "light-4":"url('./assets/images/theme/light-bg.jpg')",
        "dark":"url('./assets/images/theme/dark-banner-bg.png')", 
        "dark_about_bg":"url('./assets/images/theme/color-sharp.png')", 
        "light_about_bg":"url('./assets/images/theme/light_about_bg.png')", 
      }
    },
  },
  plugins: [],
}

