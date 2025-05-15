export function formatNumber(num: number): string {
  if (num < 1000) return num.toFixed(0)
  if (num < 1000000) return (num / 1000).toFixed(2) + "K"
  if (num < 1000000000) return (num / 1000000).toFixed(2) + "M"
  return (num / 1000000000).toFixed(1) + "B"
}
