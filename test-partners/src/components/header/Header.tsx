import React from 'react'
import HeaderIcon from '../../assets/images/Header-ic0n.png';
import Logout from '../../assets/images/Logout.png';
import './Header.css'

const Header = () => {
    return (
        <div className='header-container'>
            <div className='header-box'>
                <img src={HeaderIcon} />
                <div className='logout-box'>
                    <p>name@x-parters.com</p>
                <img src={Logout} width={18} height={18} />
                </div>
            </div>
        </div>
    )
}

export default Header