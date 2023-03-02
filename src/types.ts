export interface Coin {
  id: string
  symbol: string
  name: string
  pin?: boolean
}

// define for now
export type LatestData = Record<
  string,
  {
    usd: number
    usd_24h_change: number
  }
>
