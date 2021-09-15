import { UPDATE_MESSAGE } from "../actions/message";
import { UPDATE_ERROR } from "../actions/message";

export function message(state = {
  message: null,
  error: null
}, action) {
  switch (action.type) {
    // Update message
    case UPDATE_MESSAGE:
      return {
        message: action.message
      }
    case UPDATE_ERROR:
      return {
        message: action.error
      }
    default:
      return state
  }
}