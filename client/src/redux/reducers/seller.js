import { UPDATE_SELLER } from "../actions/seller";

export function seller(state = {
  seller: null,
}, action) {
  switch (action.type) {
    // Update seller
    case UPDATE_SELLER:
      return {
        seller: action.seller
      }
    default:
      return state
  }
}