import React, { useEffect, useState } from 'react';
import './DashboardPage.css'

function DashboardPage() {

    const [tabClick, setTabClick] = useState("Sold")
    const [editing, setEditing] = useState(false)
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
        // send fetch with new user to backend ('/user/update')
        fetch('/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json()).then(data => {
            if(data.error) {
                setError(data.error)
                console.log(error)
            } else {
                console.log(data)
            }
        })
    }


    function handleNameEdit(e){
        const userUpdate = { ...userInfo, name: e.target.value}
        setUserInfo(userUpdate)
    }
    function handleGenderEdit(e){
        const userUpdate = { ...userInfo, gender: e.target.value}
        setUserInfo(userUpdate)
    }
    function handleBioEdit(e){
        const userUpdate = { ...userInfo, bio: e.target.value}
        setUserInfo(userUpdate)
    }

    const { bio, name, gender, preferences } = userInfo
    return (
        <div className="dashboard-container-main">
            <div className="picture-bio">
                <div>
                    <img class="profile-bear" alt="user-img" src='/Images/Profile.png' />
                </div>
                {editing ? <div className="bio-container">
                    <form onSubmit={handleUserInfoChange}>
                        <input onChange={(e) => handleNameEdit(e)} value={name}/> 
                        <button onClick={() => setEditing(true)} className='edit-button'>
                            <img alt='edit-icon' class="edit-icon" src="/Images/edit-icon.png" />
                        </button>
                        <input onChange={(e) => handleGenderEdit(e)} value={gender}/>
                        <input onChange={(e) => handleBioEdit(e)} value={bio}/>
                        {editing ? <button type="submit">Submit Changes</button> : ''}
                    </form>
                </div> :
                    <div className="bio-container">
                        <h2> {name} </h2>
                        <button onClick={() => setEditing(true)} className='edit-button'>
                            <img alt='edit-icon' class="edit-icon" src="/Images/edit-icon.png" />
                        </button>
                        <h4>{gender}</h4>
                        <span>{bio}</span>
                        {editing ? <button onClick={() => handleUserInfoChange()}>Submit Changes</button> : ''}
                    </div>
                }
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
        </div >
    )
}

export default DashboardPage
