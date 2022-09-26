import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormPage from '../LoginFormPage';
import { useState } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [showLogin, setShowLogin] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <p className="login" onClick={()=> setShowLogin(true)}>Log In</p>
        <NavLink to="/signup" className="signup">Sign Up</NavLink>
      </>
    );
  }

  function toggleModal(){
    setShowLogin(!showLogin)
  }

  return (
    <>
    <div className='navBar'>
      <ul>
        <li>
            <NavLink exact to="/" className="home">stays</NavLink>
            {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
    {showLogin && (<LoginFormPage toggleModal={toggleModal}></LoginFormPage>)}
    </>
  );
}

export default Navigation;
