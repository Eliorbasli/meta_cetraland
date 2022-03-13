import React from 'react';
// import { Button } from './Button';
import './../style/Button.css'
import './../style/App.css'
import './../style/HeroSection.css'

import {Link} from 'react-router-dom';
// import {BrowserRouter as Router ,Route , Routes} from "react-router-dom";

function HeroSectioin() {

  const cleanStorage = (e) => {
    //localStorage.removeItem('token');
  }

  return (
    
    <div className='hero-container' >
        {/* <video src="/videos/video-2.mp4" autoPlay loop muted/> */}
        
        <h1>Centraland</h1>
        <h2>E&A.Ltd</h2>
        <p >What are you waiting for? </p>
        <div className='hero-btns'>
            {/* <Button className='btns' buttonStyle='btn--outline' path='/login' buttonSize='btn--large'>Login</Button> */}
            <Link to='/login' className = 'btn-mobile'>
              <button className='btns btn--large' buttonstyle='btn--outline'>Login</button>
            </Link>

            <Link to='/map' className = 'btn-mobile'>
              <button className='btns btn--large' onClick={cleanStorage} buttonstyle='btn--primary' buttonsize='btn--large'>Play as guest</button>
            </Link>
            
        </div>
    </div>
  )
}

export default HeroSectioin;