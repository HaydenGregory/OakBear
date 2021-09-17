export const UPDATE_SELLER = 'UPDATE_SELLER'

export function actionUpdateSeller(seller) {
  return {
    type: UPDATE_SELLER,
    seller
  }
}
