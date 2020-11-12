import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  FormLayout, FormLayoutGroup, Input, Panel, SimpleCell, View
} from '@vkontakte/vkui'
import {MAX_LENGTH_INPUT_BALANCE, PAGES} from '@/constants/constants'
import {
  hideLoader, nextPage, prevPage, showLoader
} from '@/store/actions/appActions'
import {HeaderPanel} from '@/components/Navigation/HeaderPanel/HeaderPanel'
import {SelectIcon} from '@/components/UI/SelectIcon/SelectIcon'
import {clearPageOptions, setPageOptions} from '@/store/actions/pagesActions'
import {inputBalanceFilter} from '@/filters/numbersFilter'
import {setCategories} from '@/store/actions/categoriesActions'
import {PopoutAlert} from '@/components/UI/PopoutAlert/PopoutAlert'
import {ButtonDelete} from '@/components/UI/ButtonDelete/ButtonDelete'
import {ButtonSave} from '@/components/UI/ButtonSave/ButtonSave'
import {StateProcessor} from '@/core/StateProcessor'
import store from '../../store/store'

function openModalIcons(icon) {
  store.dispatch(clearPageOptions(PAGES.MODAL_ICONS))
  store.dispatch(setPageOptions(PAGES.MODAL_ICONS, {
    icon,
    onClick: (icon) => {
      store.dispatch(setPageOptions(PAGES.CATEGORY, {icon}))
      store.dispatch(prevPage())
    }
  }))
  store.dispatch(nextPage({modal: PAGES.MODAL_ICONS}))
}

function saveAndClose(newCategories) {
  store.dispatch(setCategories(newCategories))
  store.dispatch(hideLoader())
  store.dispatch(prevPage())
}

export const Category = () => {
  const dispatch = useDispatch()

  const {id, icon, type} = useSelector(({pages}) => pages[PAGES.CATEGORY])

  const [title, setTitle] = useState('')
  const [budget, setBudget] = useState('')

  const isEdit = id !== null

  useEffect(() => {
    if (id === null) return

    const categories = store.getState().categories
    const _category = type === 'expense'
      ? categories.expense.find(category => category.id === id)
      : categories.income.find(category => category.id === id)

    setTitle(_category.title)
    setBudget(_category.budget || '')
  }, [id, setTitle, setBudget, type])


  const onClickIcon = () => openModalIcons(icon)
  const onChangeBudget = ({currentTarget}) => setBudget(currentTarget.value)
  const onChangeTitle = ({currentTarget}) => setTitle(currentTarget.value)
  const onSave = () => {
    const newCategory = {
      id,
      icon,
      title: title || 'Новая категория',
      budget: +budget || null
    }
    dispatch(showLoader())
    StateProcessor.saveCategory(newCategory, type).then(saveAndClose)
  }
  const onDelete = () => {
    dispatch(nextPage({popout: (
      <PopoutAlert
        title={`Удалить ${title || 'Новая категория'}?`}
        button={{title: 'Удалить', action: () => {
          dispatch(showLoader())
          StateProcessor.deleteCategory(id, type).then(saveAndClose)
        }}}
      >
        Категорию нельзя будет восстановить.
        <br/>
        Все операции связанные с этой категорией останутся.
      </PopoutAlert>
    )}))
  }

  return (
    <View activePanel="main">
      <Panel id="main">
        <HeaderPanel buttonBack={true}>
          {isEdit ? 'Редактирование категории' : 'Новая категория'}
        </HeaderPanel>

        <FormLayout>
          <FormLayoutGroup top="Название">
            <SimpleCell
              style={{paddingLeft: 0}}
              disabled
              after={
                <SelectIcon
                  onClick={onClickIcon}
                  color='#3f8ae0'
                  icon={icon}
                />
              }
            >
              <Input
                type="text"
                value={title}
                maxLength={50}
                onChange={onChangeTitle}
                name="title"
                placeholder="Новая категория"
              />
            </SimpleCell>
          </FormLayoutGroup>
          {type === 'expense' && (
            <FormLayoutGroup top="Бюджет в месяц">
              <Input
                type="text"
                maxLength={MAX_LENGTH_INPUT_BALANCE}
                value={inputBalanceFilter(budget)}
                name="budget"
                onChange={onChangeBudget}
                placeholder="Без бюджета"
                inputMode="numeric"
              />
            </FormLayoutGroup>
          )}
        </FormLayout>

        {isEdit && <ButtonDelete onClick={onDelete}/>}
        <ButtonSave onClick={onSave}/>
      </Panel>
    </View>
  )
}
