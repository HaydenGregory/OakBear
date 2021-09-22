import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {actionUpdateError } from '../redux/actions/message';
import { actionUpdateUser } from '../redux/actions/user';
import './Checkout.css'

function DeleteFav(props) {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [userInfoState, setUserInfoState] = useState("")


    useEffect(() => {
        setUserInfoState(user)
    }, [user])
    
    function handleClick() {
        let newCart = user.cart
        let itemToDelete = props.aCartItem
        let index = newCart.indexOf(itemToDelete)
        let newerCart = newCart.splice(index, 1)
        const userUpdate = { ...userInfoState, cart: newerCart }
        setUserInfoState(userUpdate)
        console.log(userInfoState)

        fetch('/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfoState)
        }).then(res => res.json()).then(data => {
            if (data.error) {
                dispatch(actionUpdateError(data.error))
            } else {
                dispatch(actionUpdateUser(data.user))
            }
        })
    }

    return (
        <div>
            <button class='button-check color-button' onClick={handleClick}>
                Delete
            </button>
        </div>
    )
}

export default DeleteFav
