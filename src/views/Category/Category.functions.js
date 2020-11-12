import React from 'react'
import {DEFAULT_TITLE} from './Category.constants'
import {hideLoader, nextPage, prevPage, showLoader
} from '@/store/actions/appActions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {stringToNumber} from '@/core/utils/number'
import {deleteCategory, saveCategory} from '@/stateManager'
import store from '@/store/store'


const {dispatch} = store

export function save(category, type) {
  dispatch(showLoader())
  const newCategory = {
    ...category,
    title: category.title || DEFAULT_TITLE,
    budget: stringToNumber(category.budget)
  }
  saveCategory(newCategory, type).then(close)
}

export function del(id, type) {
  const action = () => {
    dispatch(showLoader())
    deleteCategory(id, type).then(close)
  }
  const popout = (
    <PopoutAlert title='Удалить категорию?' button={{title: 'Удалить', action}}>
      Категорию нельзя будет восстановить.
      <br/>
      Все операции связанные с этой категорией останутся.
    </PopoutAlert>
  )
  dispatch(nextPage({popout}))
}

export function getHeader(isEdit) {
  return isEdit ? 'Редактирование категории' : 'Новая категория'
}

function close() {
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}
