import React, { useEffect, useState } from 'react';
import './DashboardPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { actionUpdateMessage, actionUpdateError } from '../redux/actions/message';
import { actionUpdateUser } from '../redux/actions/user';
import MessageDisplay from '../components/MessageDisplay';
import Checkout from '../components/Checkout';

function DashboardPage() {
    const [tabClick, setTabClick] = useState("Sold")
    const [editing, setEditing] = useState(false)
    const [editingPref, setEditingPref] = useState(false)
    const { user } = useSelector(state => state.user)
    const { message, error } = useSelector(state => state.message)
    const [userInfoState, setUserInfoState] = useState("")
    const [profilePic, setProfilePic] = useState({
        public_id: "test/prcvnkp0nupz6xn1bw9p",
        url: "https://res.cloudinary.com/oakbear/image/upload/v1632153426/test/lzq2pyldms3fegeitits.png"
    })
    const [err, setError] = useState('')
    const [msg, setMsg] = useState('')
    const dispatch = useDispatch();
    const cartArr = Object.values(user.cart)
    const soldArr = Object.values(user.sold)
    const purchasedArr = Object.values(user.purchased)

    useEffect(() => {
        setError(error)
        setMsg(message)
        setUserInfoState(user)
    }, [message, error, user])

    const handleUpload = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append("images", file)
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProfilePic(data)
                console.log(profilePic)
                const userUpdate = { ...userInfoState, picture: data }
                setUserInfoState(userUpdate)
            })
    }

    function handleUserInfoChange(e) {
        e.preventDefault()
        console.log(userInfoState)
        setEditing(false)
        setEditingPref(false)
        // send fetch with new user to backend ('/user/update')
        fetch('/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfoState)
        }).then(res => res.json()).then(data => {
            if (data.error) {
                dispatch(actionUpdateError(data.error))
            } else {
                dispatch(actionUpdateUser(data.user))
                dispatch(actionUpdateMessage(data.msg))
            }
        })
    }


    function handlePrefEdit(e) {
        const userUpdate = { ...userInfoState, preferences: e.target.value }
        setUserInfoState(userUpdate)
    }
    function handleNameEdit(e) {
        const userUpdate = { ...userInfoState, name: e.target.value }
        setUserInfoState(userUpdate)
    }
    function handleGenderEdit(e) {
        const userUpdate = { ...userInfoState, gender: e.target.value }
        setUserInfoState(userUpdate)
    }
    function handleBioEdit(e) {
        const userUpdate = { ...userInfoState, bio: e.target.value }
        setUserInfoState(userUpdate)
    }

    const { bio, name, gender, preferences} = userInfoState
    return (
        <div className='dash-background'>
            {error || msg ? <MessageDisplay errMessage={err} successMessage={msg} /> : ''}
            <div className="dashboard-container-main">
                <div className="picture-bio">
                    <div>
                        <img className="profile-bear" alt="user-img" src={user.picture?.url? user.picture.url : '/Images/Profile.png' } />
                    </div>
                    <div className="preferences">
                        <span id="pref">
                            Preferences
                            <button onClick={() => setEditingPref(true)} className='edit-button'>
                                <img alt='edit-icon' className="edit-icon-pref" src="/Images/edit-icon.png"/>
                            </button>
                        </span>
                        {editingPref ?
                            <form onSubmit={handleUserInfoChange}>
                                <textarea onChange={(e) => handlePrefEdit(e)} value={preferences} />
                                <button type="submit" >Submit Changes</button>
                            </form> :
                            <ul>
                                <li>{preferences}</li>
                            </ul>
                        }
                    </div>
                </div>
                <div className="pref-listed">
                    {editing ? <div className="bio-container">
                        <form onSubmit={handleUserInfoChange}>
                            <label for="profilepic">Change your profile picture</label>
                            <input className='file-upload' type="file" multiple name="file" id="file_up" onChange={(e) => handleUpload(e)} /><br />
                            <label for="name">Name</label><br />
                            <input className="edit-field" id="name" onChange={(e) => handleNameEdit(e)} value={name} /> <br />
                            <label for="gender">Gender</label><br />
                            <input className="edit-field" id="gender" onChange={(e) => handleGenderEdit(e)} value={gender} /><br />
                            <label for="bio">Bio</label><br />
                            <input className="edit-field" id="bio" onChange={(e) => handleBioEdit(e)} value={bio} /><br />
                            <button type="submit">Submit Changes</button>
                        </form>
                    </div> :
                        <div className="bio-container">
                            <h2> {name}
                                <button onClick={() => setEditing(true)} className='edit-button'>
                                    <img alt='edit-icon' className="edit-icon" src="/Images/edit-icon.png" />
                                </button>
                            </h2>
                            <h4>{gender}</h4>
                            <span>{bio}</span>
                        </div>
                    }
                    <div className="change-table">
                        <div className="pagination">
                            <button className={tabClick === "Sold" && "active"} onClick={() => setTabClick("Sold")}>Sold</button>
                            <button className={tabClick === "Purchased" && "active"} onClick={() => setTabClick("Purchased")}>Purchased</button>
                            <button className={tabClick === "Saved" && "active"} onClick={() => setTabClick("Saved")}>Saved</button><br /><br />
                        </div>
                        <div className='display-pag'>
                            {tabClick === "Sold" &&         
                            <div className="saved-container">
                            {soldArr.map((soldItem) => {
                                return (
                                <div className="saved-card">
                                    <div className="saved-img">
                                        <img src={soldItem.images.url} height="75px" width="54px" alt= "" />
                                    </div>
                                    <div className="saved-title">{soldItem.title}</div>
                                    <div className="saved-price">{soldItem.price}</div>
                                    <div className="saved-condition">{soldItem.condition}</div>
                                </div>)
                            })}
                        </div>}
                            {tabClick === "Purchased" &&                             
                            <div className="saved-container">
                                {purchasedArr.map((purchasedItem) => {
                                    return (
                                    <div className="saved-card">
                                        <div className="saved-img">
                                            <img src={purchasedItem.images.url} height="75px" width="54px" alt= "" />
                                        </div>
                                        <div className="saved-title">{purchasedItem.title}</div>
                                        <div className="saved-price">{purchasedItem.price}</div>
                                        <div className="saved-condition">{purchasedItem.condition}</div>
                                    </div>)
                                })}
                            </div>}
                            {tabClick === "Saved" &&                             
                            <div className="saved-container">
                                {cartArr.map((cartItem) => {
                                    return (
                                    <div className="saved-card">
                                        <div className="saved-img">
                                            <img className='actual-img' src={cartItem.images.url} height="200px" width="150px" alt= "" />
                                        </div>
                                        <div className="saved-title">{cartItem.title}</div>
                                        <div className="saved-price">US$ {cartItem.price}</div>
                                        <div className="saved-condition">{cartItem.condition}</div>
                                        <div className="saved-button"><Checkout itemID={cartItem.item_id}/></div>
                                    </div>)
                                })}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
