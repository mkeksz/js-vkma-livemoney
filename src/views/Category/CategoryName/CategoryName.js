import React from 'react'
import {useSelector} from 'react-redux'
import {FormLayoutGroup, Input, SimpleCell} from '@vkontakte/vkui'
import {MAX_LENGTH_TITLE_CATEGORY, PAGES} from '@/constants/constants'
import {DEFAULT_TITLE} from '../Category.constants'
import {SelectIcon} from '@/components/UI/SelectIcon/SelectIcon'
import {changeTitle, openModalIcons} from './categoryName.functions'


export const CategoryName = () => {
  const {category} = useSelector(({pages}) => pages[PAGES.CATEGORY])

  const onClick = openModalIcons
  const onChange = ({currentTarget}) => changeTitle(currentTarget.value)

  return (
    <FormLayoutGroup top="Название">
      <SimpleCell
        style={{paddingLeft: 0}}
        disabled
        after={
          <SelectIcon onClick={onClick} color='#3f8ae0' icon={category.icon}/>
        }
      >
        <Input
          type="text"
          value={category.title || ''}
          maxLength={MAX_LENGTH_TITLE_CATEGORY}
          onChange={onChange}
          name="title"
          placeholder={DEFAULT_TITLE}
        />
      </SimpleCell>
    </FormLayoutGroup>
  )
}
