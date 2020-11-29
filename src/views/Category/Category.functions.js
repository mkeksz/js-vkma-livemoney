import React from 'react'
import {DEFAULT_TITLE} from './Category.constants'
import {ERRORS} from '@/constants/constants'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {stringToNumber} from '@/core/utils/number'
import {deleteCategory, saveCategory as saveCat} from '@/stateManager'
import {removeCategory, saveCategory} from '@/store/actions/categoriesActions'
import {getMessageError} from '@/filters/errorFilter'
import {PopoutWarn} from '@/components/UI/PopoutWarn/PopoutWarn'
import {getLast} from '@/core/utils/array'
import store from '@/store/store'


const {dispatch, getState} = store

export function save(category, type, initCategory) {
  const newCategory = {
    ...category,
    type,
    title: (category.title && category.title.trim()) || DEFAULT_TITLE,
    budget: stringToNumber(category.budget),
    disabled: true
  }
  dispatch(saveCategory(newCategory))
  saveCat(newCategory).catch(() => {
    const msg = getMessageError(ERRORS.FAILED_FETCH)
    dispatch(setPopout(<PopoutWarn text={msg.text} title={msg.title}/>))
    const lastItem = getLast(getState().categories)
    if (initCategory) dispatch(saveCategory({...initCategory, disabled: false}))
    else dispatch(removeCategory(lastItem.id))
  })
  close()
}

export function del(id, type, initCategory) {
  const action = () => {
    dispatch(removeCategory(id))
    deleteCategory(id, type).catch(() => {
      const msg = getMessageError(ERRORS.FAILED_FETCH)
      dispatch(setPopout(<PopoutWarn text={msg.text} title={msg.title}/>))
      dispatch(saveCategory(initCategory, true))
    })
    close()
  }

  const popout = (
    <PopoutAlert title='Удалить категорию?' button={{title: 'Удалить', action}}>
      Категорию нельзя будет восстановить.
      <br/>
      Все операции, связанные с этой категорией, останутся.
    </PopoutAlert>
  )
  dispatch(setPopout(popout))
}

function close() {
  store.dispatch(prevPage())
}
