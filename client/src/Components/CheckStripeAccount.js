import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionUpdateMessage } from '../redux/actions/message'
import { actionUpdateSeller } from '../redux/actions/seller'

function CheckStripeAccount() {
    const [err, setError] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('/stripe/get_seller').then(res => res.json()).then(data => {
            if (data.charges_enabled === false){
                setError("Please finish creating your stripe account to make your post active")
                dispatch(actionUpdateMessage(err))
            }
            dispatch(actionUpdateSeller(data))
        })
    }, [dispatch, err])

    return (
        <div>
            
        </div>
    )
}

export default CheckStripeAccount
