export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_SELLERINFO = 'UPDATE_SELLERINFO'

export function actionUpdateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function actionUpdateSellerInfo(user, info) {
  return {
    type: UPDATE_USER,
    user,
    info
  }
}

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