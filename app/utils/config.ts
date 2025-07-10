/* eslint-disable node/prefer-global/process */
export const host
  = process.env.NODE_ENV === 'production'
    ? (process.env.NUXT_PUBLIC_HOST_PROD || 'https://marprezd.dev')
    : process.env.NUXT_PUBLIC_HOST_DEV
