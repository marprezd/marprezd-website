import { nextui } from '@nextui-org/theme'
import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
    './node_modules/@nextui-org/theme/dist/components/(popover|tabs|scroll-shadow|divider|user|chip|pagination|tooltip|card|dropdown|avatar|button|code|input|kbd|link|navbar|snippet|toggle|ripple|spinner|popover).js',
  ],
  theme: {
    container: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      center: true,
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'md': '3rem',
        'lg': '4rem',
        'xl': '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
      },
      aspectRatio: {
        '5/3': '5/3',
      },
      keyframes: {
        'slide-up-fade': {
          0: { transform: 'translateY(10px)' },
          1: { transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          1: { transform: 'translateY(0px)' },
          0: { transform: 'translateY(10px)' },
        },
        'enterFromRight': {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'enterFromLeft': {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'exitToRight': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        'exitToLeft': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        'scaleIn': {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        'scaleOut': {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        'fadeIn': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fadeOut': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade':
        'slide-down-fade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scaleIn': 'scaleIn 200ms ease',
        'scaleOut': 'scaleOut 200ms ease',
        'fadeIn': 'fadeIn 200ms ease',
        'fadeOut': 'fadeOut 200ms ease',
        'enterFromLeft': 'enterFromLeft 250ms ease',
        'enterFromRight': 'enterFromRight 250ms ease',
        'exitToLeft': 'exitToLeft 250ms ease',
        'exitToRight': 'exitToRight 250ms ease',

      },
      typography: () => ({
        custom: {
          css: {
            '--tw-prose-body': 'var(--color-body)',
            '--tw-prose-headings': 'var(--color-headings)',
            '--tw-prose-lead': 'var(--color-lead)',
            '--tw-prose-links': 'var(--color-links)',
            '--tw-prose-bold': 'var(--color-bold)',
            '--tw-prose-counters': 'var(--color-counters)',
            '--tw-prose-bullets': 'var(--color-bullets)',
            '--tw-prose-hr': 'var(--color-hr)',
            '--tw-prose-quotes': 'var(--color-quotes)',
            '--tw-prose-quote-borders': 'var(--color-quote-borders)',
            '--tw-prose-captions': 'var(--color-captions)',
            '--tw-prose-code': 'var(--color-code-fg)',
            '--tw-prose-pre-bg': 'var(--color-pre-code-bg)',
            '--tw-prose-pre-code': 'var(--color-pre-code-fg)',
            '--tw-prose-th-borders': 'var(--color-th-borders)',
            '--tw-prose-td-borders': 'var(--color-td-borders)',
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [
    typography,
    nextui({
      prefix: 'nextui',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            background: '#fafafa',
            foreground: '#171717',
            primary: {
              50: '#ecfeff',
              100: '#cffafe',
              200: '#a5f3fc',
              300: '#67e8f9',
              400: '#22d3ee',
              500: '#06b6d4',
              600: '#0891b2',
              700: '#155e75',
              800: '#164e63',
              900: '#083344',
              foreground: '#ffffff',
              DEFAULT: '#0e7490',
            },
            secondary: {
              50: '#fef2f2',
              100: '#fee2e2',
              200: '#fecaca',
              300: '#fca5a5',
              400: '#f87171',
              500: '#ef4444',
              600: '#dc2626',
              700: '#991b1b',
              800: '#7f1d1d',
              900: '#450a0a',
              foreground: '#ffffff',
              DEFAULT: '#b91c1c',
            },
            divider: 'rgba(17, 17, 17, 0.15)',
            focus: '#f87171',
          },
        },
        dark: {
          colors: {
            background: '#171717',
            foreground: '#fafafa',
            primary: {
              50: '#083344',
              100: '#164e63',
              200: '#155e75',
              300: '#0e7490',
              400: '#0891b2',
              500: '#06b6d4',
              600: '#22d3ee',
              700: '#a5f3fc',
              800: '#cffafe',
              900: '#ecfeff',
              foreground: '#164e63',
              DEFAULT: '#67e8f9',
            },
            secondary: {
              50: '#450a0a',
              100: '#7f1d1d',
              200: '#991b1b',
              300: '#b91c1c',
              400: '#dc2626',
              500: '#ef4444',
              600: '#f87171',
              700: '#fecaca',
              800: '#fee2e2',
              900: '#fef2f2',
              foreground: '#7f1d1d',
              DEFAULT: '#fecaca',
            },
            divider: 'rgba(255, 255, 255, 0.15)',
            focus: '#f97316',
          },
        },
      },
    }),
    plugin(({ addVariant }) => {
      addVariant('hover-none', '@media (hover: none) and (pointer: coarse)')
    }),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: value => ({
          perspective: value,
        }),
      })
    })
  ],
}
