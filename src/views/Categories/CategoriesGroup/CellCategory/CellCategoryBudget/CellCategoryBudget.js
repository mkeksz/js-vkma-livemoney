import React from 'react'
import PropTypes from 'prop-types'
import {Subhead} from '@vkontakte/vkui'
import {currencyFilter} from '@/filters/numbersFilter'
import classes from '../CellCategory.module.sass'


export const CellCategoryBudget = ({category}) => {
  const cls = `${classes.budget_max} ${classes.budget}`

  return (
    <>
      <Subhead weight="medium">{currencyFilter(category.amount)}</Subhead>
      {category.budget > 0 && (
        <Subhead weight="regular" className={cls}>
          {currencyFilter(category.budget, false)}
        </Subhead>
      )}
    </>
  )
}

CellCategoryBudget.propTypes = {
  category: PropTypes.object
}
