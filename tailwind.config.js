/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Noto Serif JP"', "serif"],
                sans: ['"Noto Sans JP"', "sans-serif"],
            },
            colors: {
                izakaya: {
                    red: '#b91c1c',
                    dark: '#0f0f0f',
                    wood: '#451a03',
                }
            }
        },
    },
    plugins: [],
}
