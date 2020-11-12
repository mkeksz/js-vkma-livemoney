import React, {useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Cell, Group, Switch} from '@vkontakte/vkui'
import {PAGES} from '@/constants/constants'
import {setPageOptions} from '@/store/actions/pagesActions'

export const InTotal = () => {
  const dispatch = useDispatch()

  const {wallet} = useSelector(({pages}) => pages[PAGES.WALLET])

  const inTotalInput = useRef(null)
  if (inTotalInput.current) inTotalInput.current.checked = wallet.inTotal

  const onChange = () => {
    dispatch(setPageOptions(PAGES.WALLET, {
      wallet: {...wallet, inTotal: !wallet.inTotal}
    }))
  }

  return (
    <Group>
      <Cell
        asideContent={
          <Switch
            name="inBalance"
            defaultChecked={wallet.inTotal}
            onChange={onChange}
            getRef={inTotalInput}
          />
        }
      >
        Учитывать в общем балансе
      </Cell>
    </Group>
  )
}
