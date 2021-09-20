import React from 'react'

function Checkout(props) {
    function handleClick() {
        fetch('/stripe/create-checkout-session', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id: props.itemID,
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.log(e.error)
        })
    }

    return (
        <div>
            <button onClick={handleClick}>
                Checkout
            </button>
        </div>
    )
}

export default Checkout
