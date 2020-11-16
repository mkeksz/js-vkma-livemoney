import {TYPES_OPERATION} from '@/constants/constants'

export function getNewOperations(operation, operations) {
  const _operations = [...operations]
  const isEdit = !!operation.id
  if (isEdit) {
    const targetIndex = _operations.findIndex(op => op.id === operation.id)
    _operations[targetIndex] = operation
  } else {
    operation.id = _operations.length > 0 ? _operations[0].id + 1 : 1
    _operations.unshift(operation)
  }

  _operations.sort((a, b) => new Date(b.date) - new Date(a.date))
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
  const _operation = {...operation}
  if (rollback) _operation.amount = -_operation.amount
  const walletsInit = getWalletsOfOperation(_operation, await getWallets())
  if (walletsInit.from) {
    walletsInit.from.balance -= _operation.amount
    await saveWallet(walletsInit.from)
  }
  if (walletsInit.to) {
    walletsInit.to.balance += _operation.amount
    await saveWallet(walletsInit.to)
  }
}

export async function correctAnalytics(
    operation, getAnalytics, saveAnalytics, rollback = false
) {
  const type = operation.type
  if (type === TYPES_OPERATION.TRANSFER) return

  const dateOperation = operation.date.slice(0, 7)

  const analytics = await getAnalytics(0, -1)
  const indexAnalytic = analytics.findIndex(a => a.date === dateOperation)
  await console.log(analytics)
  if (indexAnalytic === -1) return

  const toDateAnalytic = analytics[indexAnalytic]

  const itemID = type === TYPES_OPERATION.EXPENSE
    ? operation.to.itemID
    : operation.from.itemID

  const analytic = toDateAnalytic.amounts[type]
  const budget = analytic.find(a => a.id === itemID)

  if (rollback) budget.amount -= operation.amount
  else budget.amount += operation.amount

  saveAnalytics(analytics)
}
