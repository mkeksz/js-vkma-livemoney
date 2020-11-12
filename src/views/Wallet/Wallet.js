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


export const Wallet = () => {
  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])

  const isEdit = !!wallet.id

  const onSave = () => save(wallet)
  const onDelete = () => del(wallet.id)

  return (
    <RootPanel header={{content: getTitle(isEdit), back: true}}>
      <CardExample/>

      <WalletForm/>

      <Colors/>

      <InTotal/>

      {isEdit && <ButtonDelete onClick={onDelete}/>}
      <ButtonSave onClick={onSave}/>
    </RootPanel>
  )
}
