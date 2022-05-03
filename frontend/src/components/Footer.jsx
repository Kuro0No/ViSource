import React from 'react'
import '../style/Footer.scss'
import { FacebookOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <footer>
      <svg viewBox="0 0 120 28">
        <defs>
          <filter id="goo"> 
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
               1 0 0 0 0  
               0 1 0 0 0  
               0 0 1 0 0  
               0 0 0 13 -9" result="goo" />
            <xfeBlend in="SourceGraphic" in2="goo" />
          </filter>
          <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
        </defs>

        <use id="wave3" className="wave" xlinkHref="#wave" x="0" y="-2" ></use>
        <use id="wave2" className="wave" xlinkHref="#wave" x="0" y="0" ></use>


        <g className="gooeff" filter="url(#goo)">
          <circle className="drop drop1" cx="20" cy="2" r="8.8" />
          <circle className="drop drop2" cx="25" cy="2.5" r="7.5" />
          <circle className="drop drop3" cx="16" cy="2.8" r="9.2" />
          <circle className="drop drop4" cx="18" cy="2" r="8.8" />
          <circle className="drop drop5" cx="22" cy="2.5" r="7.5" />
          <circle className="drop drop6" cx="26" cy="2.8" r="9.2" />
          <circle className="drop drop1" cx="5" cy="4.4" r="8.8" />
          <circle className="drop drop2" cx="5" cy="4.1" r="7.5" />
          <circle className="drop drop3" cx="8" cy="3.8" r="9.2" />
          <circle className="drop drop4" cx="3" cy="4.4" r="8.8" />
          <circle className="drop drop5" cx="7" cy="4.1" r="7.5" />
          <circle className="drop drop6" cx="10" cy="4.3" r="9.2" />

          <circle className="drop drop1" cx="1.2" cy="5.4" r="8.8" />
          <circle className="drop drop2" cx="5.2" cy="5.1" r="7.5" />
          <circle className="drop drop3" cx="10.2" cy="5.3" r="9.2" />
          <circle className="drop drop4" cx="3.2" cy="5.4" r="8.8" />
          <circle className="drop drop5" cx="14.2" cy="5.1" r="7.5" />
          <circle className="drop drop6" cx="17.2" cy="4.8" r="9.2" />
          <use id="wave1" className="wave" xlinkHref="#wave" x="0" y="1" />
        </g>
        <path id="wave1" className="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />


      </svg >
      {/* <div className='content-footer'>
        <div className='footer-left'>
          <div className='col-6'>
            <div className='d-flex'>
              <img src="https://i.pinimg.com/originals/1a/1b/54/1a1b54c1fcaa7ce6ede8508418dbaf00.gif" alt="" />
              <div id='left-right'>
                <h5>Lorem Ipsum</h5>
                <span>Footer hi</span>
              </div>
            </div>
            <div className='des-left'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis diam, vulputate in risus eu, porttitor condimentum purus. Phasellus ullamcorper, odio id feugiat bibendum
            </div>
          </div>
        </div>
        <div className='footer-right'>
          <div className='col-6'>
            <div className='d-flex'>
              <div id='right-right'>
                <h5>Contact me</h5>
                <span>Footer hi</span>
              </div>
            </div>
            <div className='des-left'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis diam, vulputate in risus eu, porttitor condimentum purus. Phasellus ullamcorper, odio id feugiat bibendum
            </div>
          </div>
        </div>
      </div> */}
      <div className='content-footer-container'>

        <div className='content-footer'>
          <a href="https://facebook.com/meoss.khai">
            <FacebookOutlined />
          </a>
          <a href="https://m.me/meoss.khai">
            <MessageOutlined />
          </a>
          <a href="">
            <WhatsAppOutlined />
          </a>
        </div>
        <div>
          Copyright Mạnh Khải
        </div>
      </div>
    </footer >
  )
}

export default Footer