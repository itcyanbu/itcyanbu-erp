/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ghl-blue': '#155EEF',
                'ghl-bg': '#F9FAFB',
                'ghl-text': '#111827',
                'ghl-gray': '#6B7280',
                'ghl-border': '#E5E7EB',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
