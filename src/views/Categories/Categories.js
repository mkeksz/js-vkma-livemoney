import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Group,
  Panel,
  Tabs,
  TabsItem,
  View
} from '@vkontakte/vkui'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import classes from './Categories.module.sass'
import {PAGES} from '../../constants/constants'
import {
  clearPageOptions,
  setPageOptions
} from '../../store/actions/pagesActions'
import {CellCategory} from './CellCategory/CellCategory'
import {nextPage} from '../../store/actions/appActions'

const PAGE = PAGES.CATEGORIES
const TAB_EXPENSE = 'expense'
const TAB_INCOME = 'income'

function sortCategories(categories) {
  return categories.sort((a, b) => {
    if (a.amount || b.amount) return b.amount - a.amount
    return b.budget - a.budget
  })
}

export const Categories = () => {
  const dispatch = useDispatch()

  const {income, expense} = useSelector(({categories}) => categories)
  const selectedTab = useSelector(({pages}) => pages[PAGE].selectedTab)

  const categories = selectedTab === TAB_EXPENSE ? expense : income
  const sortedCategories = useMemo(() => sortCategories(categories),
      [categories])

  const onClickTab = (selectedTab) =>
    dispatch(setPageOptions(PAGE, {selectedTab}))
  const onClickCategory = (category) => {
    dispatch(setPageOptions(PAGES.CATEGORY, {
      id: category.id,
      icon: category.icon,
      type: selectedTab
    }))
    dispatch(nextPage({view: PAGES.CATEGORY}))
  }
  const onClickNewCategory = () => {
    dispatch(clearPageOptions(PAGES.CATEGORY))
    dispatch(nextPage({view: PAGES.CATEGORY}))
  }

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>Категории</HeaderPanel>
        <Tabs>
          <TabsItem
            selected={selectedTab === TAB_EXPENSE}
            onClick={() => onClickTab(TAB_EXPENSE)}
          >
            Расход
          </TabsItem>
          <TabsItem
            selected={selectedTab === TAB_INCOME}
            onClick={() => onClickTab(TAB_INCOME)}
          >
            Доход
          </TabsItem>
        </Tabs>
        <Group className={classes.Categories}>
          <CellCategory isNew={true} onClick={onClickNewCategory}/>
          {sortedCategories.map(category => (
            <CellCategory
              key={category.id}
              category={category}
              onClick={() => onClickCategory(category)}
            />
          ))}
        </Group>
      </Panel>
    </View>
  )
}
