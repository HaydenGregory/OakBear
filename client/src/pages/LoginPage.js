import React from 'react'
import './LoginPage.css'

function Login() {
    return (
    <div>
        <div className='login-container-main'>
            <div>
                <img class='LoginBear' src='/Images/Login.png' alt='bear'/>
            </div>
            <div className='login-container'>
                <div className='login-form'>
                    <button tyoe='button' class='toggle-button'>Login</button>
                    <button tyoe='button' class='toggle-button'>Register</button>
                    <div>
                        <div>
                            <form>
                                <label className='info-login' for='username'>Username</label><br/>
                                <input className='info-login' type='text' id='username'></input><br/>
                                <label className='info-login' for='username'>Password</label><br/>
                                <input className='info-login' type='text' id='username'></input><br/>
                                <input type="submit" value="Submit"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login
