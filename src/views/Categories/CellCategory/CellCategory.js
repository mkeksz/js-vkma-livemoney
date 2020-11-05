import React from 'react'
import PropTypes from 'prop-types'
import classes from './CellCategory.module.sass'
import {Separator, SimpleCell, Subhead, Text} from '@vkontakte/vkui'
import {currencyFilter} from '../../../filters/numbersFilter'
import {Icon} from '../../../components/UI/Icon/Icon'
import {ICONS} from '../../../constants/constants'
import {percentNumOfNum} from '../../../core/utils'

export const CellCategory = ({isNew = false, category = {}, onClick}) => {
  const cls = [classes.CellCategory]

  if (isNew) cls.push(classes.CellCategory_new)

  if (!isNew && category.budget) {
    const percentAmount = percentNumOfNum(category.amount, category.budget)

    if (percentAmount > 90) cls.push(classes.CellCategory_red)
    else if (percentAmount > 50) cls.push(classes.CellCategory_orange)
    else cls.push(classes.CellCategory_green)
  }

  return (
    <>
      {!isNew && <Separator className={classes.separator}/>}
      <SimpleCell
        className={cls.join(' ')}
        onClick={onClick}
        before={
          <div className={classes.icon}>
            {
              !isNew && !category.icon
                ? ''
                : <Icon icon={category.icon || ICONS.PLUS}/>
            }
          </div>
        }
        after={
          <div className={classes.budget}>
            {!isNew && (
              <>
                <Subhead weight="medium">
                  {currencyFilter(category.amount)}
                </Subhead>
                {category.budget && (
                  <Subhead
                    weight="regular"
                    className={`${classes.budget_max} ${classes.budget}`}
                  >
                    {currencyFilter(category.budget, false)}
                  </Subhead>
                )}
              </>
            )}
          </div>
        }
      >
        <Text weight="medium" className={classes.name}>
          {isNew ? 'Новая категория' : category.title}
        </Text>
      </SimpleCell>
    </>
  )
}

CellCategory.propTypes = {
  isNew: PropTypes.bool,
  category: PropTypes.object,
  onClick: PropTypes.func.isRequired
}
