import React from 'react'
import { useDispatch } from 'react-redux'
import { actionLoggedOut } from '../redux/actions/user'
import './Logout.css'




function Logout() {
    const dispatch = useDispatch()
    function handleSubmit(e){
        e.preventDefault()
        fetch('/user/logout', {
            method: "POST"
        }).then(res => res.json()).then(data => {
            dispatch(actionLoggedOut())
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button class='logout-button' type="submit">Logout</button>
            </form>
        </div>
    )
}

export default Logout
