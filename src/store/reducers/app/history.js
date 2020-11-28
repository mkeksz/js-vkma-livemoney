import {bridgeAppClose, disableSwipeBack, enableSwipeBack} from '@/core/bridge'
import {getLast} from '@/core/utils/array'


export function pushToHistory(state, payload) {
  const oldHistory = state.history

  const prevHistory = oldHistory[oldHistory.length - 1]

  const nextHistory = payload
  if (!nextHistory.epic) nextHistory.epic = prevHistory.epic
  if (!nextHistory.view) nextHistory.view = prevHistory.view

  const newHistory = [...oldHistory, nextHistory]
  if (newHistory.length > 10) newHistory.shift()

  if (getLast(newHistory).view !== 'main') disableSwipeBack()
  window.history.pushState({...nextHistory}, nextHistory.view)
  return {...state, history: newHistory}
}

export function backToHistory(state) {
  if (state.history.length === 1) {
    bridgeAppClose()
    return state
  }
  const history = [...state.history]
  history.pop()
  if (getLast(history).view === 'main') enableSwipeBack()
  return {...state, history, timeBack: Date.now()}
}
