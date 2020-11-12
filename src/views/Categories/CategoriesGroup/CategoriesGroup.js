import React from 'react'
import {Group} from '@vkontakte/vkui'
import {CellCategory} from './CellCategory/CellCategory'
import {clickNew} from '../categories.functions'
import {useCategories, useTab} from '../categories.hooks'
import {clickCategory} from './categoriesGroup.functions'


export const CategoriesGroup = () => {
  const tab = useTab()
  const categories = useCategories(tab, true)

  const onClick = (category) => clickCategory(category, tab)
  const onClickNew = () => clickNew()

  return (
    <Group style={{padding: '35px 0 25px'}}>
      <CellCategory isNew={true} onClick={onClickNew}/>
      {categories.map(cat => (
        <CellCategory key={cat.id} category={cat} onClick={() => onClick(cat)}/>
      ))}
    </Group>
  )
}
