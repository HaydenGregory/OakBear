import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer>
            <div className="footer">
                <div className="footer_main">
                    <h3>Quick Start</h3>
                    <ul>
                        <li>lorem lorem</li>
                        <li>lorem</li>
                        <li>lorem lorem</li>
                        <li>lorem lorem</li>
                    </ul>
                </div>
                <div className="footer_right">
                    <div className="footer_links">
                        <i className="fas fa-facebook-alt"></i>
                        <i className="fas fa-twitter"></i>
                        <i className="fas fa-telegram"></i>
                        <i className="fas fa-pintrest"></i>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Copyright © 2021 All Rights Reserved by Oak Bear.
            </div>
        </footer>
    )
}

export default Footer
