import React from 'react'
import { useSelector} from 'react-redux';

function CartPage() {
    const user = useSelector(state => state.user.user)
    const userInfo= user.cart
    const cartArr = Object.values(userInfo)
    console.log(cartArr)

    return (
        <div>
            {cartArr.map((cartItem) => {
                return (<span>{cartItem.title}</span>)
            })}
        </div>
    )
}

export default CartPage
