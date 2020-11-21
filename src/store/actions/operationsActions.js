import {REMOVE_OPERATION, SAVE_OPERATION, SET_OPERATIONS} from '../types'

export function setOperations(operations) {
  return {type: SET_OPERATIONS, payload: operations}
}

export function removeOperation(operationID) {
  return {type: REMOVE_OPERATION, payload: operationID}
}

export function saveOperation(operation) {
  return {type: SAVE_OPERATION, payload: operation}
}
