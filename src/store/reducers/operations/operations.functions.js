export function removeOperation(operations, operationID) {
  return operations.filter(op => op.id !== operationID)
}

export function saveOperation(operations, {operation, rollbackOps}) {
  const _operations = [...operations]
  const isEdit = !!operation.id

  if (rollbackOps) return [...rollbackOps]
  else if (isEdit) {
    const index = _operations.findIndex(w => w.id === operation.id)
    _operations[index] = {...operation}
  }

  return _operations
}
