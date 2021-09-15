export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const UPDATE_ERROR = 'UPDATE_ERROR'

export function actionUpdateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}
export function actionUpdateError(error) {
  return {
    type: UPDATE_ERROR,
    error
  }
}