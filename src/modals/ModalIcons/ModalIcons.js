import React from 'react'
import {useSelector} from 'react-redux'
import {ModalPage, Div} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {HeaderModal} from '@/components/Navigation/HeaderModal/HeaderModal'
import {Icon} from '@/components/UI/Icon/Icon'
import {getStyle} from './modalIcons.functions'
import classes from './ModalIcons.module.sass'


export const ModalIcons = () => {
  const {onClick, emptyIcon} = useSelector(({pages}) =>
    pages[PAGES.MODAL_ICONS])
  const icons = useSelector(({icons}) => icons)


  return (
    <ModalPage header={<HeaderModal>Выберите иконку</HeaderModal>}>
      <Div className={classes.ModalIcons}>
        {emptyIcon && <div style={getStyle()} onClick={() => onClick(null)}/>}
        {icons.map(i => (
          <div key={i.id} onClick={() => onClick(i)} style={getStyle(i)}>
            <Icon icon={i}/>
          </div>
        ))}
      </Div>
    </ModalPage>
  )
}
