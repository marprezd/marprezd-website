import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type WakapiSummaries = {
  data: {
    data: [
      {
        categories: [
          {
            name: string
            total_seconds: number
            text: string
          }
        ]
        languages: [
          {
            name: string
            total_seconds: number
          },
        ]
        grand_total: {
          minutes: number
          text: string
        }
        range: {
          date: string
          timezone: string
        }
      },
    ],
    cumulative_total: {
      seconds: number
      text: string
    }
    daily_average: {
      days_including_holidays: number
      days_minus_holidays: number
      holidays: number
      seconds: number
    }
  }
}

export type WakapiStats = {
  data: {
    data: {
      total_seconds: number
      daily_average: number
      human_readable_range: string
      human_readable_total: string
      human_readable_daily_average: string
      editors: [
        {
          name: string
          text: string
          total_seconds: number
        },
      ]
      languages: [
        {
          name: string
          text: string
          total_seconds: number
        },
      ]
    }
  }
}

export type Stats = {
  stars: number
  totalCommits: number
  totalRepos: number
  followers: number
  contributions: number
  prs: number
  issues: number
  contributionCalendar: {
    totalContributions: string
    weeks: [{
      contributionDays: [{
        date: string
        contributionCount: number
      }]
    }]
  }
}
