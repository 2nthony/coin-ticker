import BigNumber from "bignumber.js";

export function currencify(price: number) {
  const n = BigNumber(price);
  return n.toFormat();
}
