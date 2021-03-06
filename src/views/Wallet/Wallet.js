import React from 'react'
import {useSelector} from 'react-redux'
import {PAGES} from '@/constants/constants'
import {CardExample} from './CardExample/CardExample'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {del, getTitle, save} from './wallet.functions'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {Colors} from './Colors/Colors'
import {WalletForm} from './WalletForm/WalletForm'
import {InTotal} from './InTotal/InTotal'
import {useTooltips} from './wallet.hooks'


export const Wallet = () => {
  const {wallet, initWallet} = useSelector(({pages}) => pages[PAGES.WALLET])

  const tooltips = useTooltips()
  const isEdit = !!wallet.id

  const onSave = () => save(wallet, initWallet)
  const onDelete = () => del(wallet.id, initWallet)

  return (
    <RootPanel header={{content: getTitle(isEdit), back: true}}>
      <CardExample tooltips={tooltips}/>

      <WalletForm tooltips={tooltips}/>

      <Colors/>

      <InTotal/>

      {isEdit && <ButtonDelete onClick={onDelete}/>}
      <ButtonSave onClick={onSave}/>
    </RootPanel>
  )
}
