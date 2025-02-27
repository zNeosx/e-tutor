import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			gray: {
  				'50': '#f5f7fa',
  				'100': '#e9eaf0',
  				'200': '#ced1d9',
  				'300': '#b7bac7',
  				'400': '#a1a5b3',
  				'600': '#6e7485',
  				'700': '#4e5566',
  				'800': '#363b47',
  				'900': '#1d2026',
  				DEFAULT: '#8c94a3',
  				White: '#ffffff'
  			},
  			primary: {
  				'100': '#ffeee8',
  				'200': '#ffddd1',
  				'300': '#ffa386',
  				'400': '#ff855e',
  				'600': '#cc522b',
  				'700': '#993d20',
  				'800': '#662916',
  				'900': '#33140b',
  				foreground: '#ffffff',
  				DEFAULT: '#ff6636'
  			},
  			secondary: {
  				'100': '#ebebff',
  				'200': '#cdcbfe',
  				'300': '#9a95fe',
  				'400': '#7872fd',
  				'600': '#453fca',
  				'700': '#342f98',
  				'800': '#222065',
  				'900': '#111033',
  				foreground: '#ffffff',
  				DEFAULT: '#564ffd'
  			},
  			success: {
  				'100': '#e1f7e3',
  				'200': '#c3e5c6',
  				'300': '#7bd785',
  				'400': '#4fca5c',
  				'600': '#1c9729',
  				'700': '#15711f',
  				'800': '#0e4c14',
  				'900': '#07260a',
  				DEFAULT: '#23bd33'
  			},
  			warning: {
  				'100': '#fff2e5',
  				'200': '#fed1a5',
  				'300': '#febb79',
  				'400': '#fda44c',
  				'600': '#cc7319',
  				'700': '#985613',
  				'800': '#65390c',
  				'900': '#331d06',
  				DEFAULT: '#fd8e1f'
  			},
  			error: {
  				'100': '#fff0f0',
  				'200': '#f4c8c8',
  				'300': '#ee8f8f',
  				'400': '#e96969',
  				'600': '#b63636',
  				'700': '#882929',
  				'800': '#5b1b1b',
  				'900': '#2d0e0e',
  				DEFAULT: '#e34444'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			}
  		},
  		gridTemplateColumns: {
  			'bai-hero': 'repeat(2, minmax(0, 648px))'
  		},
  		gridTemplateRows: {
  			'bai-hero': 'repeat(1, minmax(0, 648px))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
