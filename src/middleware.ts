import createMiddleware from 'next-intl/middleware'
import { localePrefix, locales, pathnames } from './config'

export default createMiddleware({
  defaultLocale: locales[0],
  locales,
  pathnames,
  localePrefix,
  // localeDetection: true,
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|tr|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
