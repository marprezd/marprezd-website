# The Marprezd Website Repository (also known as marprezd.dev)

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

This is the main repository for my website [`marprezd.dev`](https://marprezd.dev), built on Next.js, Chakra UI, and other great software packages.

## Software Stack

- [Next.js](https://nextjs.org/)
- [next-intl](https://next-intl.vercel.app/)
- [Cloudflare](https://www.cloudflare.com/)
- [Open Next](https://open-next.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Velite](https://velite.js.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Next Themes](https://github.com/vercel/next-themes)
- [Tabler Icons](https://tabler-icons.io/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Fuse.js](https://fusejs.io/)

## Linting and Formatting

This project uses [ESLint](https://eslint.org/) with [eslint-config](https://github.com/antfu/eslint-config) for code quality and consistency.

## Project Structure

```
├── content/
│   ├── categories/
│   ├── posts/
│   └── tags/
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
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── BaseLayout.tsx
│   ├── i18n/
│   │   ├── navigation.ts
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── lib/
│   │   └── theme.ts
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
├── tsconfig.json
├── velite.config.ts
└── wrangler.jsonc
```

## ✨ Key Features

- 🌐 **Internationalization** - Built-in support for multiple languages (English, Spanish, and Turkish) with next-intl
- 🌓 **Dark/Light Mode** - Automatic theme switching based on system preferences with Chakra UI theming and Next Themes.
- 📱 **Fully Responsive** - Optimized for all device sizes using Chakra UI
- ⚡ **Blazing Fast** - Built with Next.js for optimal performance and SEO
- 🚀 **Edge-Ready** - Deployed on Cloudflare Edge Network for global performance
- 🛠 **Modern Stack** - Built with TypeScript, Next.js 15+, and React 19+
- 🎨 **Beautiful UI** - Clean and modern interface with Chakra UI components
- 📊 **Analytics Ready** - Easy integration with your favorite analytics tools
- 🔍 **SEO Optimized** - Built-in SEO best practices and metadata management
- 📝 **Markdown and YAML Support** - Easy content management with Markdown/YAML files processed by Velite
- 📚 **Content Collections** - Organize content into collections with Velite

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
