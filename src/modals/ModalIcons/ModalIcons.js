import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {ModalPage, Div} from '@vkontakte/vkui'
import classes from './ModalIcons.module.sass'
import {HeaderModal} from '../../components/Navigation/HeaderModal/HeaderModal'
import {Icon} from '../../components/UI/Icon/Icon'
import {ICONS, PAGES} from '../../constants/constants'

export const ModalIcons = () => {
  const {icon, styles, onClick} = useSelector(({pages}) =>
    pages[PAGES.MODAL_ICONS])
  const [icons] = useState(Object.values(ICONS))

  const selectedIcon = icon || {}
  const selectedColor = '#3e88dd'

  return (
    <ModalPage
      onClose={() => {}}
      header={<HeaderModal>Выберите иконку</HeaderModal>}
    >
      <Div className={classes.ModalIcons}>
        <div
          style={{
            backgroundColor: styles.backgroundColor,
            borderColor: !selectedIcon.id
              ? selectedColor
              : styles.backgroundColor,
            boxShadow: !selectedIcon.id ? 'inset 0 0 0 2px #fff' : null
          }}
          onClick={() => onClick(null)}
        />
        {icons.map(_icon => (
          <div
            key={_icon.id}
            onClick={() => onClick(_icon)}
            style={{
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              borderColor: selectedIcon.id === _icon.id
                ? selectedColor
                : styles.backgroundColor,
              boxShadow: selectedIcon.id === _icon.id
                ? 'inset 0 0 0 2px #fff'
                : null
            }}
          >
            <Icon icon={_icon}/>
          </div>
        ))}
      </Div>
    </ModalPage>
  )
}
