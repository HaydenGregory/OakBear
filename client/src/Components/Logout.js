import React from 'react'

function handleSubmit(){
    fetch('/user/logout', {
        method: "POST"
    })
}

function Logout() {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Logout
