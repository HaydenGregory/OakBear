import React, { useEffect, useState } from 'react'
import './LoginPage.scss'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoggedIn } from '../redux/actions/user';
import { actionUpdateMessage, actionUpdateError } from '../redux/actions/message';
import MessageDisplay from '../components/MessageDisplay';
import Bear from '../Images/OakBear.png'
import InstagramGrey from '../Images/grey-insta.png'
import FacebookGrey from '../Images/grey-facebook.png'

function Login() {
    const { user } = useSelector(state => state.user)
    const { message, error } = useSelector(state => state.message)
    const dispatch = useDispatch();
    const [buttonPress, setButtonPress] = useState('login')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [err, setError] = useState('')
    const [msg, setMsg] = useState('')


    useEffect(() => {
        setError(error)
        setMsg(message)
    }, [message, error])

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
                    dispatch(actionUpdateError(data.error))
                } else {
                    dispatch(actionUpdateMessage(data.msg))
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
                    dispatch(actionUpdateMessage(data.error))
                } else {
                    dispatch(actionUpdateMessage(data.msg))
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

    if (user) {
        return (<Redirect to="/" />)
    }

    const loginDiv =
        <div>
            <form onSubmit={handleSubmitLogin} action='/user/login' method='POST'>
                <label className='info-login' for='username'>Email</label><br />
                <input value={email} onChange={(e) => handleEmailChange(e)} className='info-fill' name='email' type='text' id='username' placeholder='you@example.com'></input><br />
                <label className='info-login' for='password'>Password</label><br />
                <input value={password} onChange={(e) => handlePassword(e)} className='info-fill' name='password' type='password' id='myPassword' placeholder='**********'></input><br />
                <input className='login-submit' type="submit" value="Submit"></input>
            </form>
                <div class='forgot'>
                    <div class='forgot-password'>
                        Forgot Password?
                    </div>
                    <div class='forgot-password'>
                        Forgot Username?
                    </div>
                </div>
        </div>
    const registerDiv =
        <form onSubmit={handleSubmitRegister} action='/user/register' method='POST'>
            <label className='info-login' for='username'>Email</label><br />
            <input value={email} onChange={(e) => handleEmailChange(e)} className='info-fill' name='email' type='text' id='username' placeholder='you@example.com'></input><br />
            <label className='info-login' for='username'>Name</label><br />
            <input value={name} onChange={(e) => handleNameChange(e)} className='info-fill' name='name' type='text' id='username' placeholder='Your Name'></input><br />
            <label className='info-login' for='username'>Gender</label><br />
            <select value={gender} onChange={(e) => handleGender(e)} className='gender-selections' name='gender' id='gender'>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
            </select>
            <label className='info-login' for='password'>Password</label><br />
            <input value={password} onChange={(e) => handlePassword(e)} className='info-fill' name='password' type='password' id='myPassword' placeholder='**********'></input><br />
            <input className='login-submit' type="submit" value="Submit"></input>
        </form>

    return (
        <body className='background'>
            <div className='login-container-main'>
                <div className='oak-bear-text'>
                    Natural Habitat.
                </div>
                <div className='login-container'>
                    <div className='BearLogo-Container'>
                        <img className='BearLogo' src={Bear} alt=" " />
                    </div>
                    <hr class='lines-log'/>
                    <div className='login-form'>
                        <div className='button-container-login'>
                            <button type='button' className='login-button' onClick={() => setButtonPress('login')}>Login</button>
                            <button type='button' className='register-button' onClick={() => setButtonPress('register')}>Sign Up</button>
                        </div>
                        <div>
                            <div className='login-container-tab'>
                                {buttonPress === 'login' && loginDiv}
                                {buttonPress === 'register' && registerDiv}
                            </div>
                            <div class='social-media'>
                                <img src={InstagramGrey}/>
                                <img src={FacebookGrey}/>
                            </div>
                            {error || msg ? <MessageDisplay errMessage={err} successMessage={msg} /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login
