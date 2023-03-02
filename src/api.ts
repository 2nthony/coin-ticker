import axios from 'redaxios'

const apiurl = 'https://api.coingecko.com/api/v3'

interface PriceParams {
  ids: string[]
  vs_currencies: string
  include_marked_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
  precision?: 'full' | number
}

async function request(
  endpoint: string,
  params: PriceParams,
) {
  try {
    const r = await axios.get(apiurl + endpoint, {
      params,
      headers: {
        'cache-control': 'no-cache',
      },
    })
    return r.data
  }
  catch (message) {
    return new Error(message as any)
  }
}

export const api = {
  price(params: PriceParams) {
    return request('/simple/price', params)
  },
}
