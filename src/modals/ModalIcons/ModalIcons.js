import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {ModalPage, Div} from '@vkontakte/vkui'
import {ICONS, PAGES} from '@/constants/constants'
import {HeaderModal} from '@/components/Navigation/HeaderModal/HeaderModal'
import {Icon} from '@/components/UI/Icon/Icon'
import {getStyle} from './modalIcons.functions'
import classes from './ModalIcons.module.sass'


export const ModalIcons = () => {
  const {onClick} = useSelector(({pages}) => pages[PAGES.MODAL_ICONS])
  const [icons] = useState(Object.values(ICONS))

  return (
    <ModalPage header={<HeaderModal>Выберите иконку</HeaderModal>}>
      <Div className={classes.ModalIcons}>
        <div style={getStyle()} onClick={() => onClick(null)}/>
        {icons.map(i => (
          <div key={i.id} onClick={() => onClick(i)} style={getStyle(i)}>
            <Icon icon={i}/>
          </div>
        ))}
      </Div>
    </ModalPage>
  )
}
