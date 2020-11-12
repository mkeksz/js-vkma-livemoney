export function getNewOperations(operation, operations) {
  const _operations = [...operations]
  const isEdit = operation.id !== null

  if (isEdit) {
    const targetIndex = _operations.findIndex(op =>
      op.id === operation.id)
    _operations[targetIndex] = operation
  } else {
    operation.id = _operations.length > 0
      ? _operations[_operations.length - 1].id + 1
      : 1
    _operations.unshift(operation)
  }
  return _operations
}

export function getWalletsOfOperation(operation, wallets) {
  const from = operation.from.type === 'wallet'
    ? wallets.find(wallet => wallet.id === operation.from.itemID)
    : null
  const to = operation.to.type === 'wallet'
    ? wallets.find(wallet => wallet.id === operation.to.itemID)
    : null
  return {from, to}
}

export async function correctWallets(
    operation, getWallets, saveWallet, rollback = false
) {
  if (rollback) operation.amount = -operation.amount
  const walletsInit = getWalletsOfOperation(operation, await getWallets())
  if (walletsInit.from) {
    walletsInit.from.balance -= operation.amount
    await saveWallet(walletsInit.from)
  }
  if (walletsInit.to) {
    walletsInit.to.balance += operation.amount
    await saveWallet(walletsInit.to)
  }
}
