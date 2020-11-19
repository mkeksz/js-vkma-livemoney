import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {hideLoader, setInitialization} from './store/actions/appActions'
import {fetchInitData} from './stateManager'
import {RootView} from '@/roots/RootView/RootView'


export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchInitData().then(() => {
      dispatch(setInitialization(false))
      dispatch(hideLoader())
    })
  }, [dispatch])

  return <RootView/>
}
