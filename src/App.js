import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {hideLoader} from './store/actions/appActions'
import {fetchInitData} from './stateManager'
import {RootView} from '@/roots/RootView/RootView'


export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchInitData().then(() => dispatch(hideLoader()))
  }, [])

  return <RootView/>
}
