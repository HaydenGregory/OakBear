import React, { useEffect, useState } from 'react';
import './DashboardPage.css'
import NavBar from '../components/NavBar';

function DashboardPage() {

    const [tabClick, setTabClick] = useState("Sold")
    const [editing, setEditing] = useState(false)
    const [editingPref, setEditingPref] = useState(false)
    const [userInfo, setUserInfo] = useState("")
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/user/getuser').then(res => res.json()).then(userData => {
            setUserInfo(userData)
        })
    }, [])

    function handleUserInfoChange(e) {
        e.preventDefault()
        setEditing(false)
        setEditingPref(false)
        // send fetch with new user to backend ('/user/update')
        fetch('/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            } else {
                console.log(data)
            }
        })
    }


    function handlePrefEdit(e) {
        const userUpdate = { ...userInfo, preferences: e.target.value }
        setUserInfo(userUpdate)
    }
    function handleNameEdit(e) {
        const userUpdate = { ...userInfo, name: e.target.value }
        setUserInfo(userUpdate)
    }
    function handleGenderEdit(e) {
        const userUpdate = { ...userInfo, gender: e.target.value }
        setUserInfo(userUpdate)
    }
    function handleBioEdit(e) {
        const userUpdate = { ...userInfo, bio: e.target.value }
        setUserInfo(userUpdate)
    }

    const { bio, name, gender, preferences } = userInfo
    return (
        <div className='dash-background'>
            <div>
                <NavBar />
            </div>
        <div className="dashboard-container-main">
            <div className="picture-bio">
                <div>
                    <img class="profile-bear" alt="user-img" src='/Images/Profile.png' />
                </div>
                <div className="preferences">
                    <span id="pref">
                        Preferences
                        <button onClick={() => setEditingPref(true)} className='edit-button'>
                            <img alt='edit-icon' class="edit-icon-pref" src="/Images/edit-icon.png" />
                        </button>
                    </span>
                    {editingPref? 
                    <form onSubmit={handleUserInfoChange}>
                        <textarea onChange={(e) => handlePrefEdit(e)} value={preferences} />
                        <button type="submit" >Submit Changes</button>
                    </form>: 
                    <ul>
                        <li>{preferences}</li>
                    </ul>
                    }
                </div>
            </div>
            <div className="pref-listed">
                    {editing ? <div className="bio-container">
                        <form onSubmit={handleUserInfoChange}>
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
                                    <img alt='edit-icon' class="edit-icon" src="/Images/edit-icon.png" />
                                </button>
                            </h2>
                            <h4>{gender}</h4>
                            <span>{bio}</span>
                        </div>
                    }
                <div className="change-table">
                    <div class="pagination">
                        <button class={tabClick === "Sold" && "active"} onClick={() => setTabClick("Sold")}>Sold</button>
                        <button class={tabClick === "Purchased" && "active"} onClick={() => setTabClick("Purchased")}>Purchased</button>
                        <button class={tabClick === "Saved" && "active"} onClick={() => setTabClick("Saved")}>Saved</button><br /><br />
                        <div>
                            {tabClick === "Sold" && <p>Test for sold tab</p>}
                            {tabClick === "Purchased" && <p>Test for Purchased tab</p>}
                            {tabClick === "Saved" && <p>Test for Saved tab</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DashboardPage
