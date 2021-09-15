import React from 'react'
import './NavBar.css'
import OakBear from '../Images/OakBear.png'
import ShoppingCart from '../Images/cart.png'
import PFP from '../Images/pfp.png'
import Logout from '../components/Logout.js'

function NavBar() {
    return (
        <div>
            <div>
                <div class='navbar-container'>
                    <img class='bear-icon' src={OakBear}/>
                    <nav>
                        <ul class='nav-area'>
                            <li><a href='/' class='navbar-options'>Home</a></li>
                            <li><a href='/sell' class='navbar-options'>Sell</a></li>
                        </ul>
                    </nav>
                    <div>
                        <a href='/dashboard' class='pfp-area'><img src={PFP} width='30px'/></a>
                        <a href='#' class='cart-area'><img src={ShoppingCart} width='30px'/></a>
                    </div>
                    <div>
                    <Logout />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
