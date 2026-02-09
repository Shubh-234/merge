/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				merge: {
					primary: "#3b82f6", // Blue 500
					"primary-focus": "#2563eb", // Blue 600
					"primary-content": "#ffffff", // White

					secondary: "#8b5cf6", // Violet 500
					"secondary-focus": "#7c3aed", // Violet 600
					"secondary-content": "#ffffff", // White

					accent: "#06b6d4", // Cyan 500
					"accent-focus": "#0891b2", // Cyan 600
					"accent-content": "#ffffff", // White

					neutral: "#1f2937", // Gray 800
					"neutral-focus": "#111827", // Gray 900
					"neutral-content": "#ffffff", // White

					"base-100": "#ffffff", // White
					"base-200": "#f3f4f6", // Gray 100
					"base-300": "#e5e7eb", // Gray 200
					"base-content": "#1f2937", // Gray 800

					info: "#06b6d4", // Cyan 500
					success: "#10b981", // Green 500
					warning: "#f59e0b", // Amber 500
					error: "#ef4444", // Red 500
				},
			},
		],
	},
};
