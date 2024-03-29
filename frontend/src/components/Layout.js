import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../css/layout.css';


const { SubMenu } = Menu;

function Layout({ children }) {
 
    
  const userMenu = [
        
        {
            name: "Home",
            path: "/",
            icon: "ri-home-3-line",
        },

        {
            name: "Services",
            path: "/",
            icon: "ri-settings-3-line",
            subMenu: [
                {
                    name: "Vet Services",
                    path: "/Vetservices",
                },
                {
                    name: "Groom Services",
                    path: "/Groomservices",
                },
                {
                    name: "Training Services",
                    path: "/TrainingPrograms",
                },
            ],
        },

        {
            name: "Store",
            path: "/ProductCatalog",
            icon: "ri-store-line",
            
        },

        {
            name: "Ads",
            path: "/Advertisement",
            icon: "ri-newspaper-line",
            
        },

        {
            name: "FAQ",
            path: "/Feedback",
            icon: "ri-questionnaire-line",
        },
    ];

  return (

    <div>

       
      <div className="menu">
        <Menu mode="horizontal">
          {userMenu.map((item) => {
            
            if (item.subMenu) {
              return (
                <SubMenu key={item.name} title={item.name} icon={<i className={item.icon} />}>
                  {item.subMenu.map((subItem) => (
                    <Menu.Item key={subItem.name}>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.name} icon={<i className={item.icon} />}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </div>
      <div class="text-start">
   <a href='/SignIn'> <button type="button" class="btn btn-custom me-2">Sign In</button> </a>
    <a href = '/Register'><button type="button" class="btn btn-custom">Sign Up</button></a>
</div>


      {children}


      <div class="footer">
        <div class="container">
            <div class="row">
                <div class="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="AboutUs.php">About Us</a></li>
                        <li><a href="privacy.php">Privacy Policies</a></li>
                        <li><a href="services.php">Our Services</a></li>
                        <li><a href="blog.php">Blog</a></li>
                    </ul>
                </div>               
                <div class="footer-col">
                    <h4>Get Help</h4>
                    <ul>
                        <li><a href="/contactUs">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/livechat">Live Chat</a></li>
                        <li><a href="p/ayment">Shipping</a></li>
                        <li><a href="/products">Returns</a></li>
                    </ul>
                </div>               
 
                <div class="footer-col">
                    <h4>Payment</h4>
                    <div class="payment-links">
                        <a href="https://www.visa.com"  target='blank'><i class="ri-visa-fill"></i></a>
                        <a href="https://www.mastercard.com"  target='blank'><i class="ri-mastercard-fill"></i></a>
                        <a href="https://www.amex.com" target='blank'><i class="ri-bank-card-2-fill"></i></a>
                        <a href="https://www.paypal.com"  target='blank'><i class="ri-paypal-fill"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>follow us</h4>
                    <div class="social-links">
                        <a href="https://www.facebook.com" target='blank'><i class="ri-facebook-fill"></i></a>
                        <a href="https://www.instagram.com"  target='blank'><i class="ri-instagram-fill"></i></a>
                        <a href="https://www.linkedin.com"  target='blank'><i class="ri-linkedin-box-fill"></i></a>
                        <a href="https://www.youtube.com"  target='blank'><i class="ri-youtube-fill"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright"><p>© Copyright 2024 - PetZone Hospital Pvt. Ltd.</p><br /> 
        </div>
        </div>
        </div>


   
    
  );
}

export default Layout;