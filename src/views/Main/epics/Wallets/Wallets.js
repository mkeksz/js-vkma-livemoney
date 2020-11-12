import React from 'react'
import {useSelector} from 'react-redux'
import {Buttons} from './Buttons/Buttons'
import {WalletsGallery} from './WalletsGallery/WalletsGallery'
import {WalletsPlaceholder} from './WalletsPlaceholder/WalletsPlaceholder'
import {RootPanel} from '@/roots/RootPanel/RootPanel'

export const Wallets = () => {
  const wallets = useSelector(({wallets}) => wallets)

  return (
    <RootPanel centered={true} fixed={true} header={{content: 'Кошелёк'}}>
      {wallets.length > 0 ? (
        <>
          <WalletsGallery wallets={wallets}/>
          <Buttons/>
        </>
      ) : <WalletsPlaceholder/>}
    </RootPanel>
  )
}
