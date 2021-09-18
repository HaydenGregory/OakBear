import { LOGGED_IN, LOGGED_OUT, UPDATE_USER, UPDATE_SELLERINFO } from "../actions/user";

export function user(state = {
  checked: false,
  user: null,
}, action) {
  switch (action.type) {
    // Update user
    case UPDATE_USER:
      return {
        checked: true,
        user: action.user
      }
    // Update Seller Info
    case UPDATE_SELLERINFO:
      return {
        checked: true,
        user: action.user + action.info
      }
    // checked and have logged in
    case LOGGED_IN:
      return {
        checked: true,
        user: action.user
      }
    // checked and logged out
    case LOGGED_OUT:
      return {
        checked: true,
        user: null
      }
  
    default:
      return state
  }
}