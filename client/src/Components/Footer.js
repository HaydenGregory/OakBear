import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer>
            <div class="footer">
                <div class="footer_main">
                    <h3>Quick Start</h3>
                    <ul>
                        <li>lorem lorem</li>
                        <li>lorem</li>
                        <li>lorem lorem</li>
                        <li>lorem lorem</li>
                    </ul>
                </div>
                <div class="footer_right">
                    <div class="footer_links">
                        <i class="fas fa-facebook-alt"></i>
                        <i class="fas fa-twitter"></i>
                        <i class="fas fa-telegram"></i>
                        <i class="fas fa-pintrest"></i>
                    </div>
                </div>
            </div>
            <div class="copyright">
                Copyright © 2021 All Rights Reserved by Oak Bear.
            </div>
        </footer>
    )
}

export default Footer
