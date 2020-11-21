export function getSharedWallet(wallets) {
  const reduce = (acc, wallet) => {
    acc.realBalance += wallet.balance
    if (wallet.inTotal) acc.balance += wallet.balance
    else acc.visibleRealBalance = true
    return acc
  }

  return wallets.reduce(reduce, {
    balance: 0,
    realBalance: 0,
    visibleRealBalance: false
  })
}
