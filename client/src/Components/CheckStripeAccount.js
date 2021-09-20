import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actionUpdateMessage } from '../redux/actions/message'
import { actionUpdateSeller } from '../redux/actions/seller'
import { actionUpdateSellerInfo } from '../redux/actions/user'

function CheckStripeAccount() {
    const user = useSelector(state => state.user.user);
    const [err, setError] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('/stripe/get_seller').then(res => res.json()).then(data => {
            if (data.charges_enabled === false){
                setError("Please finish creating your stripe account to make for sale items active")
                dispatch(actionUpdateMessage(err))
            }
            dispatch(actionUpdateSeller(data))
            console.log(data)
            dispatch(actionUpdateSellerInfo(user, data))
        })
    }, [dispatch, err, user])

    return (
        <div>
            
        </div>
    )
}

export default CheckStripeAccount
