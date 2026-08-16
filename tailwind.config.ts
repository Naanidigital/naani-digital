import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  			brandDarkNavy: '#040957',
  			brandVividBlue: '#0080FF',
  			brandLightGray: '#F1F1F1',
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
  			}
  		},
  		backgroundImage: {
  			'gradient-rainbow': 'linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-mid)), hsl(var(--gradient-end)))',
  			'gradient-rainbow-r': 'linear-gradient(135deg, hsl(var(--gradient-end)), hsl(var(--gradient-mid)), hsl(var(--gradient-start)))',
  			'gradient-gold': 'linear-gradient(135deg, hsl(var(--gold-start)), hsl(var(--gold-end)))',
  		},
  		transitionProperty: {
  			smooth: 'var(--transition-smooth)'
  		},
  		fontFamily: {
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
  			serif: ['Lora', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
  			mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
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
  				from: { opacity: '0', transform: 'translateY(20px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-20px)' }
  			},
  			'particle-float': {
  				'0%, 100%': { transform: 'translate(0, 0)', opacity: '0.3' },
  				'50%': { transform: 'translate(var(--tw-particle-x, 20px), var(--tw-particle-y, -30px))', opacity: '0.8' }
  			},
  			'glow-pulse': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.5' }
  			},
  			'float-dots': {
  				'0%': { transform: 'translateY(0) translateX(0)', opacity: '0.3' },
  				'25%': { transform: 'translateY(-50px) translateX(25px)', opacity: '0.6' },
  				'50%': { transform: 'translateY(-100px) translateX(-25px)', opacity: '0.4' },
  				'75%': { transform: 'translateY(-50px) translateX(25px)', opacity: '0.6' },
  				'100%': { transform: 'translateY(0) translateX(0)', opacity: '0.3' }
  			},
  			'twinkle': {
  				'0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
  				'50%': { opacity: '1', transform: 'scale(1.5)' }
  			},
  			'sparkle': {
  				'0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
  				'50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' }
  			},
  			'slide-down': {
  				'0%': { opacity: '0', transform: 'translateY(-10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'gradient-shift': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'pulse-glow': {
  				'0%, 100%': { boxShadow: '0 0 20px hsl(43 67% 52% / 0.2)' },
  				'50%': { boxShadow: '0 0 40px hsl(43 67% 52% / 0.4)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			float: 'float 3s ease-in-out infinite',
  			'particle-float': 'particle-float 8s ease-in-out infinite',
  			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
  			'float-dots': 'float-dots 15s ease-in-out infinite',
  			'twinkle': 'twinkle 2s ease-in-out infinite',
  			'sparkle': 'sparkle 3s ease-in-out infinite',
  			'slide-down': 'slide-down 0.3s ease-out',
  			'gradient-shift': 'gradient-shift 6s ease infinite',
  			'pulse-glow': 'pulse-glow 3s ease-in-out infinite'
  		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)',
  			'gold': '0 0 20px hsl(43 67% 52% / 0.2)',
  			'gold-lg': '0 0 40px hsl(43 67% 52% / 0.3)',
  			'purple': '0 0 20px hsl(248 53% 58% / 0.2)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;