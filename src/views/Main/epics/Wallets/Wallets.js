import React from 'react'
import {useSelector} from 'react-redux'
import {Buttons} from './Buttons/Buttons'
import {WalletsGallery} from './WalletsGallery/WalletsGallery'
import {WalletsPlaceholder} from './WalletsPlaceholder/WalletsPlaceholder'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {FixedLayout, Link} from '@vkontakte/vkui'

export const Wallets = () => {
  const wallets = useSelector(({wallets}) => wallets)
  const {initialization} = useSelector(({app}) => app)

  return (
    <RootPanel centered={true} fixed={true} header={{content: 'Кошелёк'}}>
      <FixedLayout vertical='top'>
        <div style={{textAlign: 'center', backgroundColor: 'rgba(0,0,0,.1)'}}>
          <Link href='https://t.me/cryptex_off' style={{display: 'block', padding: '10px 0'}}>
              Инвестиции в криптовалюты
          </Link>
        </div>
      </FixedLayout>
      {wallets.length > 0 || initialization
        ? (
          !initialization
          && <>
            <WalletsGallery wallets={wallets}/>
            <Buttons/>
          </>
        )
        : <WalletsPlaceholder/>}
    </RootPanel>
  )
}
