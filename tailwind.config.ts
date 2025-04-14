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
				foreground: 'hsl(var(--foreground))',
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
				'burgundy': {
					DEFAULT: '#2E1A25',
					50: '#F6F3F5', 
					100: '#EBE5E8',
					200: '#D7C9D1',
					300: '#C2ADBA',
					400: '#9E8192',
					500: '#7A576B',
					600: '#5E4152',
					700: '#432C3A',
					800: '#2E1A25',
					900: '#1F1119',
					950: '#150C12', 
				},
				'wine': {
					DEFAULT: '#3B1F2B',
					50: '#F8F3F5',
					100: '#F0E6EA',
					200: '#E0CDD5',
					300: '#CFB3C0',
					400: '#AD8197',
					500: '#8B5F6D',
					600: '#684853',
					700: '#4F3540',
					800: '#3B1F2B',
					900: '#26141C',
					950: '#190D13',
				},
				'rocket-blue': {
					DEFAULT: '#F97316',
					50: '#FFF7ED', 
					100: '#FFEDD5', 
					200: '#FED7AA', 
					300: '#FDBA74', 
					400: '#FB923C', 
					500: '#F97316', 
					600: '#EA580C', 
					700: '#C2410C', 
					800: '#9A3412', 
					900: '#7C2D12',
					950: '#431407', 
				},
				'rocket-gray': {
					DEFAULT: '#6B7280',
					50: '#F5F7FA',
					100: '#E5E7EB',
					200: '#D1D5DB',
					300: '#9CA3AF',
					400: '#6B7280',
					500: '#4B5563',
					600: '#374151',
					700: '#1F2937',
					800: '#111827',
					900: '#0F172A',
				},
				'rocket-orange': {
					DEFAULT: '#F97316',
					50: '#FFF7ED',
					100: '#FFEDD5',
					200: '#FED7AA',
					300: '#FDBA74',
					400: '#FB923C',
					500: '#F97316',
					600: '#EA580C',
					700: '#C2410C',
					800: '#9A3412',
					900: '#7C2D12',
				},
				'rocket-red': {
					DEFAULT: '#EA384C',
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#EF4444',
					600: '#EA384C',
					700: '#B91C1C',
					800: '#991B1B',
					900: '#7F1D1D',
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
					'0%, 100%': { boxShadow: '0 0 5px rgba(15, 52, 96, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(15, 52, 96, 0.8)' }
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
					backgroundImage: 'linear-gradient(90deg, #F97316, #EA384C)',
				},
				'.shadow-glow': {
					boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)',
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
