const wakapi_api_key: string = process.env.WAKAPI_API_KEY || ''
const wakapi_user: string = process.env.WAKAPI_USER || ''

const WAKAPI_ENDPOINT_LAST_30_DAYS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/stats/last_30_days`

export const getLast30DaysStats = async () => {
  return fetch(WAKAPI_ENDPOINT_LAST_30_DAYS, {
    next: { revalidate: 60 * 60 * 2 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}
