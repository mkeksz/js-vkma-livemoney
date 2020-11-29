export function removeWallet(wallets, walletID) {
  return wallets.filter(wallet => wallet.id !== walletID)
}

export function saveWallet(wallets, {wallet, rollback}) {
  const _wallets = [...wallets]
  const isEdit = !!wallet.id

  if (rollback) _wallets.push({...wallet})
  else if (isEdit) {
    const index = _wallets.findIndex(w => w.id === wallet.id)
    _wallets[index] = {...wallet}
  } else _wallets.push({...wallet, id: _wallets.length})

  return _wallets
}
