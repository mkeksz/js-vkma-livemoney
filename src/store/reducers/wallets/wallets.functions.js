export function removeWallet(wallets, walletID) {
  return wallets.filter(wallet => wallet.id !== walletID)
}

export function saveWallet(wallets, newWallet) {
  const _wallets = [...wallets]
  const isEdit = !!newWallet.id

  if (isEdit) {
    const index = _wallets.findIndex(w => w.id === newWallet.id)
    _wallets[index] = newWallet
  } else {
    _wallets.push({...newWallet, id: _wallets.length, disabled: true})
  }

  return _wallets
}
