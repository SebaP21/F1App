/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"spin-smooth": "spinSmooth 5s ease-in-out infinite",
			},
			keyframes: {
				spinSmooth: {
					"0%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(7200deg)" },
					"100%": { transform: "rotate(10800deg)" },
				},
			},
		},
	},
	plugins: [],
};
