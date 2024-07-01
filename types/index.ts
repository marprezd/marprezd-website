import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type WakapiSerie = {
  data: {
    data: [
      {
        editors: [
          {
            name: string
            total_seconds: number
          },
        ]
        languages: [
          {
            name: string
            total_seconds: number
          },
        ]
        range: {
          end: string
          timezone: string
        }
      },
    ]
  }
}

export type Wakapi = {
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
