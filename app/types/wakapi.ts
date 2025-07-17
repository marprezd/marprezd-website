// Wakapi
export interface WakapiSummaries {
  data: [
    {
      grand_total: {
        hours: number
      }
      range: {
        start: string
      }
    },
  ]
  daily_average: {
    seconds: number
  }
  end: string
}

export interface WakapiStats {
  data: {
    total_seconds: number
    daily_average: number
    languages: [
      {
        name: string
        total_seconds: number
      },
    ]
    categories: [
      {
        name: string
        total_seconds: number
      },
    ]
    editors: [
      {
        name: string
        total_seconds: number
      },
    ]
  }
}
