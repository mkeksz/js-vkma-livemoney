import React from 'react'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {CategoriesTabs} from './CategoriesTabs/CategoriesTabs'
import {CatsPlaceholder} from './CatsPlaceholder/CatsPlaceholder'
import {CategoriesGroup} from './CategoriesGroup/CategoriesGroup'
import {useCategories} from './categories.hooks'


export const Categories = () => {
  const categories = useCategories()

  return (
    <RootPanel header={{back: true, content: 'Категории'}}>
      <CategoriesTabs/>
      {categories.length > 0 ? <CategoriesGroup/> : <CatsPlaceholder/>}
    </RootPanel>
  )
}
