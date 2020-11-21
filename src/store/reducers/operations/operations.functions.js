export function removeOperation(operations, operationID) {
  return operations.filter(op => op.id !== operationID)
}

export function saveOperation(operations, newOperation) {
  const _operations = [...operations]
  const isEdit = !!newOperation.id

  if (isEdit) {
    const index = _operations.findIndex(w => w.id === newOperation.id)
    _operations[index] = {...newOperation, disabled: true}
  }

  return _operations
}
