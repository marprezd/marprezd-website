# The Marprezd Website Repository (also known as marprezd.dev)

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

This is the main repository for my website [`marprezd.dev`](https://marprezd.dev), built on Next.js, Tailwind CSS, and other great software packages.

## Software Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MUI](https://mui.com/)
- [next-intl](https://next-intl.vercel.app/)
- [Cloudflare](https://www.cloudflare.com/)
- [Open Next](https://open-next.js.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Linting and Formatting

This project uses [ESLint](https://eslint.org/) with [eslint-config](https://github.com/antfu/eslint-config) for code quality and consistency.

## Project Structure

```
├── messages/
│   ├── en.json
│   ├── es.json
│   └── tr.json
├── public/
│   ├── fonts/
│   │   ├── GeistMono[wght].woff2
│   │   └── Geist[wght].woff2
│   ├── images/
│   │   └── og-image.png
│   ├── resume/
│   │   └── cv.pdf
│   ├── static/
│   │   └── blog_gxeqe5-d26f1329.jpg
│   ├── _headers
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── [...rest]/
│   │   │   │   └── page.tsx
│   │   │   ├── courses/
│   │   │   │   └── page.tsx
│   │   │   ├── guestbook/
│   │   │   │   └── page.tsx
│   │   │   ├── hire-me/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   └── page.tsx
│   │   │   ├── repositories/
│   │   │   │   └── page.tsx
│   │   │   ├── resources/
│   │   │   │   └── page.tsx
│   │   │   ├── works/
│   │   │   │   └── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── robots.txt
│   ├── components/
│   │   ├── organisms/
│   │   │   └── AppHeader.tsx
│   │   ├── templates/
│   │   │   └── NotFoundPage.tsx
│   │   └── BaseLayout.tsx
│   ├── i18n/
│   │   ├── navigation.ts
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── lib/
│   │   └── muiTheme.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── .gitignore
├── CODE_OF_CONDUCT.md
├── LICENSE
├── README.md
├── cloudflare-env.d.ts
├── eslint.config.mjs
├── global.d.ts
├── next.config.ts
├── open-next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── wrangler.jsonc
```

## ✨ Key Features

- 🌐 **Internationalization** - Built-in support for multiple languages (English, Spanish, and Turkish) with next-intl
- 🌓 **Dark/Light Mode** - Automatic theme switching based on system preferences with MUI theming
- 📱 **Fully Responsive** - Optimized for all device sizes using Tailwind CSS and MUI
- ⚡ **Blazing Fast** - Built with Next.js for optimal performance and SEO
- 🚀 **Edge-Ready** - Deployed on Cloudflare Edge Network for global performance
- 🛠 **Modern Stack** - Built with TypeScript, Next.js 15+, and React 19+
- 🎨 **Beautiful UI** - Clean and modern interface with MUI components
- 📊 **Analytics Ready** - Easy integration with your favorite analytics tools
- 🔍 **SEO Optimized** - Built-in SEO best practices and metadata management
- 📝 **Markdown Support** - Easy content management with Markdown

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

## Production

```bash
pnpm run build
pnpm run start
```

## Deployment

```bash
pnpm run deploy
```

## Code of Conduct

Please see the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
