import React, { useState } from 'react';
import './DashboardPage.css'

function DashboardPage() {

    const [tabClick, setTabClick] = useState("Sold")

    return (
        <div className="dashboard-container-main">
            <div className="picture-bio">
                <div>
                    <img class="profile-bear" alt="user-img" src='/Images/Profile.png' />
                </div>
                <div className="bio-container">
                    <span>Hello this is a sample bio </span>
                </div>
            </div>
            <div className="pref-listed">
                <div className="preferences">
                    <span>Preferences</span>
                </div>
                <div className="change-table">
                    <div class="pagination">
                        <button class={tabClick === "Sold" && "active"} onClick={()=>setTabClick("Sold")}>Sold</button>
                        <button class={tabClick === "Purchased" && "active"} onClick={()=>setTabClick("Purchased")}>Purchased</button>
                        <button class={tabClick === "Saved" && "active"} onClick={()=>setTabClick("Saved")}>Saved</button><br /><br />
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
