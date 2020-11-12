import React from 'react'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {CategoriesTabs} from './CategoriesTabs/CategoriesTabs'
import {CatsPlaceholder} from './CatsPlaceholder/CatsPlaceholder'
import {CategoriesGroup} from './CategoriesGroup/CategoriesGroup'
import {useCategories, useTab} from './categories.hooks'


export const Categories = () => {
  const tab = useTab()
  const categories = useCategories(tab)

  return (
    <RootPanel header={{back: true, content: 'Категории'}}>
      <CategoriesTabs/>
      {categories.length > 0 ? <CategoriesGroup/> : <CatsPlaceholder/>}
    </RootPanel>
  )
}
