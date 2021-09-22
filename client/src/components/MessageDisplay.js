import React from 'react'
import "./MessageDisplay.css"

function MessageDisplay(props) {

    return (
        <div className="message-container">
            <div className="error">
                {props.errMessage ? props.errMessage : ""}
            </div>
            <div className="success">
                {props.successMessage ? props.successMessage : ""}
                {props.successMessage === 'Please finish creating your stripe account to make for sale items active'? <a href={`stripe/refresh`}><button className='button-redirect'>Click here</button></a>: ''}
            </div>
        </div>
    )
}

export default MessageDisplay
