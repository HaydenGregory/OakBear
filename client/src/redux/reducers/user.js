import { LOGGED_IN, LOGGED_OUT } from "../actions/user";

export function user(state = {
  checked: false,
  user: null,
}, action) {
  switch (action.type) {
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