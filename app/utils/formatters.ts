export const formatNumber = (num: number, currency?: boolean): string => {
  if (currency && num < 1000) return num.toFixed(2)
  if (num < 1000) return num.toFixed(currency ? 2 : 0)
  if (num < 1000000) return (num / 1000).toFixed(2) + "K"
  if (num < 1000000000) return (num / 1000000).toFixed(2) + "M"
  return (num / 1000000000).toFixed(1) + "B"
}