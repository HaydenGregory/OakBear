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
            </div>
        </div>
    )
}

export default MessageDisplay
