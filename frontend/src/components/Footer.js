import React from 'react';
import '../css/footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="AboutUs.php">About Us</a></li>
                            <li><a href="privacy.php">Privacy Policies</a></li>
                            <li><a href="services.php">Our Services</a></li>
                            <li><a href="blog.php">Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Get Help</h4>
                        <ul>
                            <li><a href="/contactUs">Contact</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/livechat">Live Chat</a></li>
                            <li><a href="payment">Shipping</a></li>
                            <li><a href="/products">Returns</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Payment</h4>
                        <div className="payment-links">
                            <a href="https://www.visa.com" target='_blank'><i className="ri-visa-fill"></i></a>
                            <a href="https://www.mastercard.com" target='_blank'><i className="ri-mastercard-fill"></i></a>
                            <a href="https://www.amex.com" target='_blank'><i className="ri-bank-card-2-fill"></i></a>
                            <a href="https://www.paypal.com" target='_blank'><i className="ri-paypal-fill"></i></a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="https://www.facebook.com" target='_blank'><i className="ri-facebook-fill"></i></a>
                            <a href="https://www.instagram.com" target='_blank'><i className="ri-instagram-fill"></i></a>
                            <a href="https://www.linkedin.com" target='_blank'><i className="ri-linkedin-box-fill"></i></a>
                            <a href="https://www.youtube.com" target='_blank'><i className="ri-youtube-fill"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>© Copyright 2024 - PetZone Hospital Pvt. Ltd.</p>
            </div>
        </div>
    );
}

export default Footer;
