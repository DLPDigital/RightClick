export const formatNumber = (num: number, currency?: boolean): string => {
  if (num >= 1_000_000_000) {
    const billions = num / 1_000_000_000
    return (billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(2)) + "B"
  }
  if (num >= 1_000_000) {
    const millions = num / 1_000_000
    return (millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2)) + "M"
  }

  if (currency) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  } else {
    if (num < 1000) {
      return num.toFixed(0)
    } else {
      return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    }
  }
}
