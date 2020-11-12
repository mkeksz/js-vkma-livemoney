import React from 'react'
import PropTypes from 'prop-types'
import {Separator, SimpleCell, Text} from '@vkontakte/vkui'
import {IconCircle} from '@/components/UI/IconCircle/IconCircle'
import {getColorCategory} from '@/shared/categories'
import {CellCategoryBudget} from './CellCategoryBudget/CellCategoryBudget'
import {getTitle, getType} from './cellCategory.functions'
import classes from './CellCategory.module.sass'


export const CellCategory = ({isNew = false, category = {}, onClick}) => {
  const color = getColorCategory(category)

  const cls = [classes.CellCategory]
  if (isNew) cls.push(classes.CellCategory_new)

  const type = getType(isNew)
  const title = getTitle(isNew, category)

  return (
    <>
      {!isNew && <Separator className={classes.separator}/>}
      <SimpleCell
        className={cls.join(' ')}
        onClick={onClick}
        before={<IconCircle color={color} icon={category.icon} type={type}/>}
        after={
          <div className={classes.budget}>
            {!isNew && <CellCategoryBudget category={category}/>}
          </div>
        }
      >
        <Text weight="medium" className={classes.name}>{title}</Text>
      </SimpleCell>
    </>
  )
}

CellCategory.propTypes = {
  isNew: PropTypes.bool,
  category: PropTypes.object,
  onClick: PropTypes.func.isRequired
}
