import React from 'react'
import {RootPanel} from '@/roots/RootPanel/RootPanel'
import {AnalyticsBudget} from './AnalyticsBudget/AnalyticsBudget'
import {AnalyticsTotal} from './AnalyticsTotal/AnalyticsTotal'


export const Analytics = () => {
  return (
    <RootPanel header={{content: 'Аналитика', btnShare: true}}>
      <AnalyticsBudget/>
      <AnalyticsTotal/>
      <div style={{paddingTop: 20}}/>
    </RootPanel>
  )
}
