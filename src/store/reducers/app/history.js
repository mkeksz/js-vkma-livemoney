import {bridgeAppClose} from '../../../core/bridge'

export function pushToHistory(state, payload) {
  const oldHistory = state.history

  const prevHistory = oldHistory[oldHistory.length - 1]

  const nextHistory = payload
  if (!nextHistory.epic) nextHistory.epic = prevHistory.epic

  const newHistory = [...oldHistory, nextHistory]
  if (newHistory.length > 10) newHistory.shift()

  window.history.pushState(nextHistory, nextHistory.view)
  return {...state, history: newHistory}
}

export function backToHistory(state) {
  if (state.history.length === 1) {
    bridgeAppClose()
    return state
  }
  const history = [...state.history]
  history.pop()
  return {...state, history}
}
