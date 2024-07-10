const wakapi_api_key: string = process.env.WAKAPI_API_KEY || ''
const wakapi_user: string = process.env.WAKAPI_USER || ''

const WAKAPI_ENDPOINT_LAST_14_DAYS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/stats/last_14_days`
const WAKAPI_ENDPOINT_LAST_30_DAYS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/stats/last_30_days`
const WAKAPI_ENDPOINT_SUMMARIES_LAST_7_DAYS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/summaries?range=last_7_days`
const WAKAPI_ENDPOINT_SUMMARIES_YESTERDAY = `https://wakapi.dev/api/compat/wakatime/v1/users/current/summaries?range=yesterday`

export const getLast14DaysStats = async () => {
  return fetch(WAKAPI_ENDPOINT_LAST_14_DAYS, {
    next: { revalidate: 60 * 60 * 2 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export const getLast30DaysStats = async () => {
  return fetch(WAKAPI_ENDPOINT_LAST_30_DAYS, {
    next: { revalidate: 60 * 60 * 2 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export const getSummariesLast7DaysStats = async () => {
  return fetch(WAKAPI_ENDPOINT_SUMMARIES_LAST_7_DAYS, {
    next: { revalidate: 60 * 60 * 2 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export const getSummariesYesterday = async () => {
  return fetch(WAKAPI_ENDPOINT_SUMMARIES_YESTERDAY, {
    next: { revalidate: 60 * 60 * 12 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}
