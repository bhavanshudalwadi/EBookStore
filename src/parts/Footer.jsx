import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import Icon from '../../public/icon.png';

const Footer = () => {
  return (
    <div className="footer">
        <Link to="/" style={{textDecoration: 'none', color: '#2d2d2d'}}>
          <div style={{display: 'flex', margin: '10px 0', alignItems: 'center'}}>
              <img src={Icon} alt="Icon" style={{width: 50, height: 50, margin: '0 10px'}} />
              <div>
                  <h2 className='nav-title'>Book Store</h2>
                  <p className='nav-subtitle'>By Bhavanshu Dalwadi</p>
              </div>
          </div>
        </Link>
        <p className='mb-2'>© 2020 bhavanshudalwadi.com.</p>
        <p>All rights reserved.</p>
    </div>
  )
}

export default Footer;