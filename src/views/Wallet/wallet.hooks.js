import {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {KEYS_STORAGE_VK} from '@/constants/constants'
import {setTooltip} from '@/store/actions/tooltipActions'
import {storageSet} from '@/core/bridge'


export function useTooltips() {
  const dispatch = useDispatch()

  const showTooltips = useSelector(({tooltips}) => tooltips.editWallet)

  const [iconShow, setIconShow] = useState(showTooltips)
  const [nameWalletShow, setNameWalletShow] = useState(false)
  const [balanceShow, setBalanceShow] = useState(false)

  const iconOn = useMemo(() => () => {
    dispatch(setTooltip('editWallet', false))
    storageSet(KEYS_STORAGE_VK.TOOLTIP_EDIT_WALLET, 'true')
    setIconShow(false)
    setNameWalletShow(true)
  }, [])

  const nameWalletOn = useMemo(() => () => {
    setNameWalletShow(false)
    setBalanceShow(true)
  }, [])
  const balanceOn = useMemo(() => () => {
    setBalanceShow(false)
  }, [])

  return {
    icon: {show: iconShow, on: iconOn},
    name: {show: nameWalletShow, on: nameWalletOn},
    balance: {show: balanceShow, on: balanceOn}
  }
}
