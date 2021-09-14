import React, { useState } from 'react'
import './LoginPage.css'
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoggedIn } from '../redux/actions/user';

function Login() {
    const { user } = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch();
    const [buttonPress, setButtonPress] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)
                } else {
                    dispatch(actionLoggedIn(data.user))
                    console.log("WORKING")
                }
            })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    if(user){
        return (<Redirect to="/dashboard"/>)
    }

    const loginDiv =
        <form onSubmit={handleSubmit} action='/user/login' method='POST'>
            <label className='info-login' for='username'>Email</label><br />
            <input value={email} onChange={(e) => handleEmailChange(e)} className='info-fill' name='email' type='text' id='username'></input><br />
            <label className='info-login' for='password'>Password</label><br />
            <input value={password} onChange={(e) => handlePassword(e)} className='info-fill' name='password' type='password' id='myPassword'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>
    const registerDiv =
        <form onSubmit={handleSubmit} action='/user/register' method='POST'>
            <label className='info-login' for='username'>Email</label><br />
            <input className='info-fill' name='email' type='text' id='username'></input><br />
            <label className='info-login' for='username'>Name</label><br />
            <input className='info-fill' name='name' type='text' id='username'></input><br />
            <label className='info-login' for='username'>Gender</label><br />
            <select className='gender-selections' name='gender' id='gender'>
                <option value='male'>Male</option>
                <option value='male'>Female</option>
                <option value='male'>Other</option>
            </select>
            <label className='info-login' for='password'>Password</label><br />
            <input className='info-fill' name='password' type='text' id='password'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>

    return (
        <div className='background'>
            <div className='login-container-main'>
                <div>
                    <img class='LoginBear' src='/Images/Login.png' alt='bear' />
                </div>
                <div className='oak-bear-text'>
                    OAK BEAR
                </div>
                <div className='login-container'>
                    <div className='login-form'>
                        <button type='button' class='toggle-button' onClick={() => setButtonPress('login')}>Login</button>
                        <button type='button' class='toggle-button' onClick={() => setButtonPress('register')}>Register</button>
                        <div>
                            <div className='login-container-tab'>
                                {buttonPress === 'login' && loginDiv}
                                {buttonPress === 'register' && registerDiv}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
