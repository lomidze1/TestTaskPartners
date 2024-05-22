import React from 'react'
import HeaderIcon from '../../assets/images/Header-ic0n.png';
import Logout from '../../assets/images/Logout.png';
import './Footer.css'
import FooterImg from '../../assets/images/footer-img.png';

const Footer = () => {
    return (
        <div className='header-container'>
            <div >
                <div className='header-box'>
                    <img src={FooterImg} />
                    <div className='footer__left-box'>
                        <p>API </p>
                        <p>menu</p>
                        <p>menu</p>
                        <p>menu</p>
                    </div> </div>

                <p className='footet__bottom-txt'>IT Solutions FZCO оперирует платформой x-partners и осуществляет взаимодействие с контрагентами платформы. IFZA Dubai – Building A2, A 311C, Dubai, UAE Dubai United Arab Emirates</p>
            </div>
        </div>
    )
}

export default Footer