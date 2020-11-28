import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalRoot} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {ModalIcons} from '@/modals/ModalIcons/ModalIcons'
import {getLast} from '@/core/utils/array'
import {prevPage} from '@/store/actions/appActions'


export const RootModal = () => {
  const dispatch = useDispatch()

  const {modal} = useSelector(({app}) => getLast(app.history))

  const onCloseModal = () => dispatch(prevPage())

  return (
    <ModalRoot activeModal={modal} onClose={onCloseModal}>
      <ModalIcons id={PAGES.MODAL_ICONS}/>
    </ModalRoot>
  )
}
