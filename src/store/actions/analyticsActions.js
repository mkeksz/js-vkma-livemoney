import {SET_ANALYTICS} from '@/store/types'


export function setAnalytics(analytics) {
  return {type: SET_ANALYTICS, payload: analytics}
}
