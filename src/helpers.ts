import BigNumber from 'bignumber.js'

export function currencify(price: number) {
  const n = BigNumber(price)
  return n.toFormat()
}

export function isEqual(value: any, other: typeof value) {
  return JSON.stringify(value) === JSON.stringify(other)
}

export function omit<T, K extends keyof T>(obj: T, props: K[]): Omit<T, K> {
  const newObj = { ...obj }
  props.forEach(p => delete newObj[p])
  return newObj
}
