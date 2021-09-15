import React, { useState } from 'react'
import './LoginPage.css'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoggedIn } from '../redux/actions/user';
import MessageDisplay from '../components/MessageDisplay';

function Login() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [buttonPress, setButtonPress] = useState('login')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [error, setError] = useState('')

    const handleSubmitLogin = (e) => {
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
                }
            })
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                gender,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)
                } else {
                    dispatch(actionLoggedIn(data.newUser))
                }
            })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleGender(e) {
        setGender(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    if(user){
        return (<Redirect to="/"/>)
    }

    const loginDiv =
        <form onSubmit={handleSubmitLogin} action='/user/login' method='POST'>
            <label className='info-login' for='username'>Email</label><br />
            <input value={email} onChange={(e) => handleEmailChange(e)} className='info-fill' name='email' type='text' id='username'></input><br />
            <label className='info-login' for='password'>Password</label><br />
            <input value={password} onChange={(e) => handlePassword(e)} className='info-fill' name='password' type='password' id='myPassword'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>
    const registerDiv =
        <form onSubmit={handleSubmitRegister} action='/user/register' method='POST'>
            <label className='info-login' for='username'>Email</label><br />
            <input value={email} onChange={(e) => handleEmailChange(e)} className='info-fill' name='email' type='text' id='username'></input><br />
            <label className='info-login' for='username'>Name</label><br />
            <input value={name} onChange={(e) => handleNameChange(e)} className='info-fill' name='name' type='text' id='username'></input><br />
            <label className='info-login' for='username'>Gender</label><br />
            <select value={gender} onChange={(e) => handleGender(e)} className='gender-selections' name='gender' id='gender'>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
            </select>
            <label className='info-login' for='password'>Password</label><br />
            <input value={password} onChange={(e) => handlePassword(e)} className='info-fill' name='password' type='password' id='myPassword'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>

    return (
        <div className='background'>
            <div className='login-container-main'>
                {error? <MessageDisplay message={error} /> : ''}
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
