import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './footer.css'


function Footer(){
  const sessionUser = useSelector(state => state.session.user);

  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)



  return (
    <>
    {/* <div className='footerBar'>
        <div className='links-div'>
            <span>Created by Josh Salcido</span>
            <a>LinkedIn</a>
            <a>Github</a>
            <a>Portfolio</a>
        </div>
        <div className='tools-div'>
            <p>React</p>
            <p>Javascript</p>
            <p>Express</p>
            <p>Sequelize</p>
            <p>CSS</p>
        </div>
    </div> */}
    </>
  );
}

export default Footer;
