import React, { useEffect, useState } from 'react';
import './DashboardPage.css'

function DashboardPage() {

    const [tabClick, setTabClick] = useState("Sold")
    const [editing, setEditing] = useState(false)
    const [userInfo, setUserInfo] = useState("")

    useEffect(() => {
        fetch('/user/getuser').then(res => res.json()).then(userData => {
            setUserInfo(userData)
        })
    }, [])

    function handleUserInfoChange(){
        setEditing(false)
        // create a new user copy
        const userUpdate = {...userInfo} 

        // send fetch with new user to backend ('/user/update')
    }

    const { bio, name, gender, preferences } = userInfo
    return (
        <div className="dashboard-container-main">
            <div className="picture-bio">
                <div>
                    <img class="profile-bear" alt="user-img" src='/Images/Profile.png' />
                </div>
                <div className="bio-container">
                    <h2>
                        {name}
                        <button onClick={() => setEditing(true)} className='edit-button'>
                            <img alt='edit-icon' class="edit-icon" src="/Images/edit-icon.png" />
                        </button>
                    </h2>
                    <h4>{gender}</h4>
                    <span>{bio}</span>
                    {editing ? <button onClick={() => handleUserInfoChange()}>Submit Changes</button> : ''}
                </div>
            </div>
            <div className="pref-listed">
                <div className="preferences">
                    <span>Preferences</span>
                    <ul>
                        <li>{preferences}</li>
                    </ul>
                </div>
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
    )
}

export default DashboardPage
