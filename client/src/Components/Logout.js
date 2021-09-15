import React from 'react'
import './Logout.css'

function handleSubmit(){
    fetch('/user/logout', {
        method: "POST"
    })
}

function Logout() {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button class='logout-button' type="submit">Logout</button>
            </form>
        </div>
    )
}

export default Logout
