import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
  plugins: [typography],
}

export default config
