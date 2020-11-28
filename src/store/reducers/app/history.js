import {bridgeAppClose, disableSwipeBack, enableSwipeBack} from '@/core/bridge'


export function pushToHistory(state, payload) {
  const oldHistory = state.history

  const prevHistory = oldHistory[oldHistory.length - 1]

  const nextHistory = payload
  if (!nextHistory.epic) nextHistory.epic = prevHistory.epic
  if (!nextHistory.view) nextHistory.view = prevHistory.view

  const newHistory = [...oldHistory, nextHistory]
  if (newHistory.length > 10) newHistory.shift()

  if (newHistory.length === 2) enableSwipeBack()
  window.history.pushState({...nextHistory, popout: null}, nextHistory.view)
  return {...state, history: newHistory}
}

export function backToHistory(state) {
  if (state.history.length === 1) {
    bridgeAppClose()
    return state
  } else if (state.history.length === 2) disableSwipeBack()
  const history = [...state.history]
  history.pop()
  return {...state, history, timeBack: Date.now()}
}
