import React from 'react'
import {useSelector} from 'react-redux'
import {FormLayout} from '@vkontakte/vkui'
import {PAGES, TYPES_CATEGORY} from '@/constants/constants'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {CategoryName} from './CategoryName/CategoryName'
import {CategoryBudget} from './CategoryBudget/CategoryBudget'
import {del, save} from './Category.functions'
import {RootPanel} from '@/roots/RootPanel/RootPanel'


export const Category = () => {
  const {category, type, initCategory} = useSelector(({pages}) =>
    pages[PAGES.CATEGORY])

  const isEdit = !!category.id

  const onSave = () => save(category, type, initCategory)
  const onDelete = () => del(category.id, type, initCategory)

  return (
    <RootPanel header={{back: true, content: 'Категория'}} fixed={true}>
      <FormLayout>
        <CategoryName/>
        {type === TYPES_CATEGORY.EXPENSE && <CategoryBudget/>}
      </FormLayout>

      {isEdit && <ButtonDelete onClick={onDelete}/>}
      <ButtonSave onClick={onSave}/>
    </RootPanel>
  )
}
