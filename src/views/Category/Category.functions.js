import React from 'react'
import {DEFAULT_TITLE} from './Category.constants'
import {prevPage, setPopout} from '@/store/actions/appActions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {stringToNumber} from '@/core/utils/number'
import {deleteCategory, saveCategory as saveCat} from '@/stateManager'
import {removeCategory, saveCategory} from '@/store/actions/categoriesActions'
import store from '@/store/store'


const {dispatch} = store

export function save(category, type) {
  const newCategory = {
    ...category,
    type,
    title: category.title || DEFAULT_TITLE,
    budget: stringToNumber(category.budget)
  }
  dispatch(saveCategory(newCategory))
  saveCat(newCategory)
  close()
}

export function del(id, type) {
  const action = () => {
    dispatch(removeCategory(id))
    deleteCategory(id, type)
    close()
  }
  const popout = (
    <PopoutAlert title='Удалить категорию?' button={{title: 'Удалить', action}}>
      Категорию нельзя будет восстановить.
      <br/>
      Все операции связанные с этой категорией останутся.
    </PopoutAlert>
  )
  dispatch(setPopout(popout))
}

function close() {
  store.dispatch(prevPage())
}
