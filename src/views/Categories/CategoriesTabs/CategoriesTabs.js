import React from 'react'
import {FixedLayout, Tabs, TabsItem} from '@vkontakte/vkui'
import {TYPES_CATEGORY as TC} from '@/constants/constants'
import {useTab} from '../categories.hooks'
import {clickTab} from './categoriesTabs.functions'


export const CategoriesTabs = () => {
  const tab = useTab()

  const onClk = clickTab

  return (
    <FixedLayout vertical='top'>
      <Tabs>
        <TabsItem selected={tab === TC.EXPENSE} onClick={()=>onClk(TC.EXPENSE)}>
          Расход
        </TabsItem>
        <TabsItem selected={tab === TC.INCOME} onClick={()=>onClk(TC.INCOME)}>
          Доход
        </TabsItem>
      </Tabs>
    </FixedLayout>
  )
}
