import React from 'react'
import PropTypes from 'prop-types'
import classes from './CellCategory.module.sass'
import {Separator, SimpleCell, Subhead, Text} from '@vkontakte/vkui'
import {currencyFilter} from '../../../filters/numbersFilter'
import {IconCircle} from '../../../components/UI/IconCircle/IconCircle'
import {getColorCategory} from '../../../shared'

export const CellCategory = ({isNew = false, category = {}, onClick}) => {
  const cls = [classes.CellCategory]

  let colorIcon = null

  if (isNew) cls.push(classes.CellCategory_new)

  if (!isNew && category.budget) {
    colorIcon = getColorCategory(category.amount, category.budget)
  }

  return (
    <>
      {!isNew && <Separator className={classes.separator}/>}
      <SimpleCell
        className={cls.join(' ')}
        onClick={onClick}
        before={
          <IconCircle
            color={colorIcon}
            icon={category.icon}
            type={isNew ? 'new' : 'category'}
          />
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
