import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: {
					DEFAULT: '#000000', // Pure black for default foreground
					dark: '#333333',    // Dark gray for better readability
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'bright-red': {
					DEFAULT: '#E43D12',
					50: '#FEF2F0', 
					100: '#FCE5E0',
					200: '#F7C1B6',
					300: '#F29D8C',
					400: '#EC7962',
					500: '#E43D12',
					600: '#C3350F',
					700: '#A22C0C',
					800: '#822309',
					900: '#611A07',
					950: '#411205', 
				},
				'pink-red': {
					DEFAULT: '#D6536D',
					50: '#FBF0F3',
					100: '#F6E0E7',
					200: '#EEC2CF',
					300: '#E5A3B8',
					400: '#DB85A0',
					500: '#D6536D',
					600: '#C43157',
					700: '#A32747',
					800: '#831F39',
					900: '#62172B',
					950: '#420F1D',
				},
				'soft-pink': {
					DEFAULT: '#FFA2B6',
					50: '#FFF8FA',
					100: '#FFF0F4',
					200: '#FFE6ED',
					300: '#FFD6E3',
					400: '#FFBFD1',
					500: '#FFA2B6',
					600: '#FF7091',
					700: '#FF3E6B',
					800: '#FF0C46',
					900: '#D90031',
				},
				'golden-yellow': {
					DEFAULT: '#EFB11D',
					50: '#FEF9EE',
					100: '#FDF3D7',
					200: '#FAE7AE',
					300: '#F7DC86',
					400: '#F3CB49',
					500: '#EFB11D',
					600: '#CB9312',
					700: '#A7790F',
					800: '#825E0C',
					900: '#5E4409',
					950: '#3A2A05',
				},
				'cream': {
					DEFAULT: '#EBE9E1',
					50: '#FDFDF9',
					100: '#FBFBF4',
					200: '#F7F6E9',
					300: '#F3F1DF',
					400: '#F0EEE5',
					500: '#EBE9E1',
					600: '#D5D0B7',
					700: '#BFBB8D',
					800: '#A8A363',
					900: '#868344',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(228, 61, 18, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(228, 61, 18, 0.8)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'pulse': 'pulse 3s infinite ease-in-out',
				'float': 'float 4s infinite ease-in-out',
				'glow': 'glow 2s infinite ease-in-out',
				'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
				'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
				'hover-float': 'float 2s infinite ease-in-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase }: { addBase: Function }) {
			addBase({
				'html': {
					scrollBehavior: 'smooth',
				},
				':root': {
					'--font-sans': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
				},
				'.text-gradient': {
					backgroundClip: 'text',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					backgroundImage: 'linear-gradient(90deg, #E43D12, #D6536D)',
				},
				'.shadow-glow': {
					boxShadow: '0 0 15px rgba(228, 61, 18, 0.5)',
				},
				'.container-custom': {
					width: '100%',
					maxWidth: '1200px',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: '1rem',
					paddingRight: '1rem',
				},
				'.section-padding': {
					paddingTop: '4rem',
					paddingBottom: '4rem',
				},
				'.heading-lg': {
					fontSize: '2.5rem',
					lineHeight: '1.2',
					fontWeight: '700',
					'@media (min-width: 768px)': {
						fontSize: '3.5rem',
					},
					'@media (min-width: 1024px)': {
						fontSize: '4rem',
					},
				},
				'.heading-md': {
					fontSize: '2rem',
					lineHeight: '1.2',
					fontWeight: '700',
					'@media (min-width: 768px)': {
						fontSize: '2.5rem',
					},
					'@media (min-width: 1024px)': {
						fontSize: '3rem',
					},
				},
				'.glass-card': {
					backdropFilter: 'blur(10px)',
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					borderRadius: '0.5rem',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				},
			});
		},
	],
} satisfies Config;
