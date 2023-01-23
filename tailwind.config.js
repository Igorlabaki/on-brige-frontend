module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
	theme: {
	extend: {
		colors: {
			'desaturatedDarkCyan': 'hsl(180, 29%, 50%)',
			'LightGrayishCyan': 'hsl(180, 52%, 96%)',
			'darkGrayishYan': 'hsl(180, 8%, 52%)',
			'veryDarkGraishCyan': 'hsl(180, 14%, 20%)',
     	},
		fontFamily: {
			'league-spartan': ['"League Spartan"', 'sans-serif']},
			boxShadow: {
				'pattern': '0px 8px 18px 12px rgba(0,0,0,0.16)',
			},
		},
		keyframes: {
			openEffect: {
			  '0%': { opacity: 0 },
			  '25%': { opacity: 0.25 },
			  '50%': { opacity: 0.5 },
			  '75%': { opacity: 0.75 },
			  '100%': { opacity: 1 },
			},
			movePhotoUp: {
			  '0%': {opacity : 0 },
			  '25%': { opacity: 0.25 },
			  '50%': { opacity: 0.5 },
			  '75%': { opacity: 0.75 },
			  '100%': { opacity: 1 },
			},
			closeEffect: {
			  '0%': { opacity: 1 },
			  '25%': { opacity: 0.75 },
			  '50%': { opacity: 0.5 },
			  '75%': { opacity: 0.25 },
			  '100%': { opacity: 0 },
			},        
			openItems: {
			  '0%': { transform: 'scaleY(0)' },
			  '100%': { transform: 'scaleY(1)' },
			},
			closeCartEffect: {
			  '0%': { transform: 'translateX(0px)' },
			  '100%': { transform: 'translateX(600px)' },
			}
		  },
		  animation: {
			'openOpacity': 'openEffect 0.5s linear',
			'closeAuthMenu': 'closeEffect 2s linear',
			'openItems': 'openItems 0.5s linear',
			'closeCart': 'closeCartEffect 0.2s linear',
		}, 
	},
	plugins: [],
};