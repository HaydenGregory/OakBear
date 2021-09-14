export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export function actionLoggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}

export function actionLoggedOut() {
  return {
    type: LOGGED_OUT
  }
}