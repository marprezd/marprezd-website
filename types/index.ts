import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type WakapiSummaries = {
  data: {
    data: [
      {      
        grand_total: {
          hours: number
        },
        range: {
          start: string
        }
      }
    ]
    cumulative_total: {
      text: string
      seconds: number
    }
    daily_average: {
      days_minus_holidays: number
      holidays: number
      seconds: number
    }
    end: string
  }
}

export type WakapiStats = {
  data: {
    data: {
      languages: [
        {
          name: string
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
