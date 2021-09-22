import React from 'react'
import './NavBar.css'
import OakBear from '../Images/OakBear.png'
import ShoppingCart from '../Images/cart.png'
import PFP from '../Images/pfp.png'
import Logout from '../components/Logout.js'
import SearchBar from '../components/SearchBar'

function NavBar() {
    return (
        <div>
            <div className='navbar-container'>
                <a href='/' ><img className='bear-icon' src={OakBear} width="150px" height="66.29px" alt=" " /></a>
                <nav>
                    <span className='nav-area'>
                        <SearchBar />
                    </span>
                </nav>
                    <div className="sellcart-container">
                        <div className="sell-container">
                            <a href='/sell' className='navbar-options'>SELL</a>
                        </div>
                    </div>
                <div className="logout-container">
                    <div className="cart-container">
                        <a href='/dashboard' className='pfp-area'><img src={PFP} width='20px' height="20px" alt=" " /></a>
                        <a href='/cart' className='cart-area'><img src={ShoppingCart} width='20px' height="20px" alt=" " /></a>
                    </div>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default NavBar
