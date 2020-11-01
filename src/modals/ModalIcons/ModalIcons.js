import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalPage, Div} from '@vkontakte/vkui'
import classes from './ModalIcons.module.sass'
import {HeaderModal} from '../../components/Navigation/HeaderModal/HeaderModal'
import {Icon} from '../../components/UI/Icon/Icon'
import {ICONS, PAGES} from '../../constants/constants'
import {setPageOptions} from '../../store/actions/pagesActions'
import {prevPage} from '../../store/actions/appActions'

export const ModalIcons = () => {
  const dispatch = useDispatch()

  const selectedIcon = useSelector(({pages}) =>
    pages[PAGES.MODAL_ICONS].icon || {})
  const styles = useSelector(({pages}) => pages[PAGES.MODAL_ICONS].styles)
  const [icons] = useState(Object.values(ICONS))
  const selectedColor = '#3e88dd'

  const onClickIcon = (icon) => {
    dispatch(setPageOptions(PAGES.WALLET, {icon}))
    dispatch(prevPage())
  }

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
              : styles.backgroundColor
          }}
          onClick={() => onClickIcon(null)}
        />
        {icons.map(icon => (
          <div
            key={icon.id}
            onClick={() => onClickIcon(icon)}
            style={{
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              borderColor: selectedIcon.id === icon.id
                ? selectedColor
                : styles.backgroundColor
            }}
          >
            <Icon icon={icon}/>
          </div>
        ))}
      </Div>
    </ModalPage>
  )
}
