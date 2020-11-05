import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Button,
  Div,
  FormLayout,
  FormLayoutGroup,
  Input,
  Panel,
  SimpleCell,
  View
} from '@vkontakte/vkui'
import {HeaderPanel} from '../../components/Navigation/HeaderPanel/HeaderPanel'
import {PAGES} from '../../constants/constants'
import {SelectIcon} from '../../components/SelectIcon/SelectIcon'
import {
  clearPageOptions,
  setPageOptions
} from '../../store/actions/pagesActions'
import {
  hideLoader,
  nextPage,
  prevPage,
  showLoader
} from '../../store/actions/appActions'
import store from '../../store/store'
import {inputBalanceFilter} from '../../filters/numbersFilter'
import {StateProcessor} from '../../core/StateProcessor'
import {setCategories} from '../../store/actions/categoriesActions'
import {PopoutAlert} from '../../components/UI/PopoutAlert/PopoutAlert'

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
  const onClickSave = () => {
    const newCategory = {
      id,
      icon,
      title: title || 'Новая категория',
      budget: +budget || null
    }
    dispatch(showLoader())
    StateProcessor.saveCategory(newCategory, type).then(saveAndClose)
  }
  const onClickDelete = () => {
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
              <SimpleCell disabled>
                <Input
                  type="text"
                  maxLength={15}
                  value={inputBalanceFilter(budget)}
                  name="budget"
                  onChange={onChangeBudget}
                  placeholder="Без бюджета"
                  inputMode="numeric"
                />
              </SimpleCell>
            </FormLayoutGroup>
          )}
        </FormLayout>

        {isEdit && (
          <Div style={{paddingTop: '20px'}}>
            <Button size="l" mode="destructive" onClick={onClickDelete}>
              УДАЛИТЬ КАТЕГОРИЮ
            </Button>
          </Div>
        )}

        <Div style={{paddingTop: '20px', paddingBottom: '25px'}}>
          <Button size="xl" mode="commerce" onClick={onClickSave}>
            {isEdit ? 'СОХРАНИТЬ' : 'СОЗДАТЬ'}
          </Button>
        </Div>

      </Panel>
    </View>
  )
}
