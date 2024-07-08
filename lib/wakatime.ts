const wakatime_api_key: string = process.env.WAKATIME_API_KEY || ''

const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats';
const ALL_TIME_SINCE_TODAY = 'https://wakatime.com/api/v1/users/current/all_time_since_today';
const WAKATIME_API_ENDPOINT_LAST_7_DAYS = `https://wakatime.com/api/v1/users/current/stats/last_7_days`

export const getLast30DaysStats = async () => {
  return fetch(`${STATS_ENDPOINT}/last_30_days`, {
    next: { revalidate: 60 * 60 * 2 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakatime_api_key).toString('base64')}`,
    },
  })
}