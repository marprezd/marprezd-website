import { defineEventHandler, useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const token = config.githubApiToken
  const endpoint = config.public.githubEndpoint

  const today = new Date()
  const lastYear = new Date(today)
  lastYear.setFullYear(today.getFullYear() - 1)

  const query = `
    query {
      viewer {
        contributionsCollection(from: "${lastYear.toISOString()}", to: "${today.toISOString()}") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: {
      login: 'marprezd',
    } }),
  })

  if (!res.ok) {
    return { error: 'Failed to fetch GitHub contributions' }
  }

  const { data } = await res.json()
  // Flatten the weeks into a single array of days
  const days = data.viewer.contributionsCollection.contributionCalendar.weeks
    .flatMap((week: any) => week.contributionDays)
    .map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
    }))

  return days
})
