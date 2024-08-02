import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    now: new Date(),
    messages: (
      await (locale === 'en' 
        ? 
          import('../messages/en.json')
        : import(`../messages/${locale}.json`))
    ).default,
  }
});
