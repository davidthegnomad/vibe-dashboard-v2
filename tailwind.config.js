/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(248, 45%, 4%)", // HSB: 248, 45, 4 (Dark Blue/Purple)
                surface: {
                    DEFAULT: "hsla(0, 0%, 100%, 0.04)",
                    hover: "hsla(0, 0%, 100%, 0.09)",
                },
                accent: {
                    primary: "hsl(250, 66%, 67%)", // HSB: 250, 66, 67
                    secondary: "hsl(171, 65%, 70%)", // HSB: 171, 65, 70 (Teal)
                },
                border: {
                    DEFAULT: "hsla(0, 0%, 100%, 0.08)",
                    hover: "hsla(0, 0%, 100%, 0.22)",
                },
            },
            backgroundImage: {
                'vibe-gradient': "radial-gradient(ellipse 80% 50% at 20% -10%, hsla(250, 66%, 67%, 0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, hsla(171, 65%, 70%, 0.07) 0%, transparent 60%)",
            },
        },
    },
    plugins: [],
};
