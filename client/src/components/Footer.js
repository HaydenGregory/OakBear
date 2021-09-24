import React from 'react'
import './Footer.css'
import Home from '../Images/home-ico.png'
import Dollar from '../Images/dollar.png'
import Profile from '../Images/pfpp.png'
import GitHub from '../Images/github.png'
import Instagram from '../Images/instagram.png'
import Twitter from '../Images/twitter.png'
import Facebook from '../Images/facebook.png'

function Footer() {
    return (
        <footer>
            <div className='footer-top'>
                <div className="footer">
                    <div className="footer_main">
                        <h3>Contact Us:</h3>
                        <ul>
                            <li>oakbear.co@gmail.com</li>
                        </ul>
                    </div>
                    <div className="footer_main">
                        <h3>Link:</h3>
                        <ul>
                            <li><a href='/' className='foot-links'><img src={Home} alt="home"/>Home</a></li>
                            <li><a href='/dashboard' className='foot-links'><img src={Profile} alt="profile"/>Dashboard</a></li>
                            <li><a href='/sell' className='foot-links'><img src={Dollar} alt="dollar"/>Sell</a></li>
                        </ul>
                    </div>
                    <div className="footer_right">
                        <div className="footer_links">
                            <i className="fas fa-github-alt"><a href='https://github.com/HaydenGregory/OakBear'><img src={GitHub} alt="github"/></a></i>
                            <i className="fas fa-instagram"><a href><img src={Instagram} alt="instagram"/></a></i>
                            <i className="fas fa-telegram"><a href><img src={Twitter} alt="twitter"/></a></i>
                            <i className="fas fa-pintrest"><a href><img src={Facebook} alt="facebook"/></a></i>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    Copyright © 2021 All Rights Reserved by Oak Bear.
                </div>
            </div>
        </footer>
    )
}

export default Footer
