export function mapAnalytics(analytics) {
  return analytics.reverse()
}

export function mapOperations(operations) {
  return operations.map(operation => {
    const date = new Date(operation.date * 1000)
    operation.date = date.toISOString()
    return operation
  })
}
