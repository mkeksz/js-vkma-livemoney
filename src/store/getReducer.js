export default function(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
  }
}
