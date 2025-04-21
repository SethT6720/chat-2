/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            scrollbar: {
                DEFAULT: {
                    thickness: 'thin',
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}