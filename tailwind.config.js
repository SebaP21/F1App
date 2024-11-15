/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"spin-smooth": "spinSmooth 5s ease-in-out infinite",
				fadeLeft: "fadeLeft 0.5s ease-out",
				fadeRight: "fadeRight 1s ease-out",
				fadeUp: "fadeUp 0.5s ease-out",
				fadeDown: "fadeDown 0.5s ease-out",
				pulseFast: 'pulseFast 0.4s ease-in-out infinite',
			},
			keyframes: {
				spinSmooth: {
					"0%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(7200deg)" },
					"100%": { transform: "rotate(10800deg)" },
				},
				fadeLeft: {
					"0%": { opacity: "0", transform: "translateX(1000px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeRight: {
					"0%": { opacity: "0", transform: "translateX(-1000px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeDown: {
					"0%": { opacity: "0", transform: "translateY(-20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				pulseFast: {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.7', transform: 'scale(1.05)' },
				  },
			},
			fontFamily: {
				"Formula1-Bold": ["Formula1-Bold", "sans-serif"],
				"Formula1-Regular": ["Formula1-Regular", "sans-serif"],
				"Formula1-Wide": ["Formula1-Wide", "sans-serif"],
			},
		},
	},
	plugins: [],
};
