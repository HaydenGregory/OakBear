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
            <div>
                <div className='navbar-container'>
                    <a href='/' ><img className='bear-icon' src={OakBear} alt=" "/></a>
                    <nav>
                        <ul className='nav-area'>
                            <SearchBar />
                            <li><a href='/sell' className='navbar-options'>SELL</a></li>
                        </ul>
                    </nav>
                    <div>
                        <a href='/dashboard' className='pfp-area'><img src={PFP} width='30px' alt=" "/></a>
                        <a href='/cart' className='cart-area'><img src={ShoppingCart} width='30px' alt=" "/></a>
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
