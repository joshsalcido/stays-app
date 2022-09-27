import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormPage from '../LoginFormPage';
import { useState } from 'react';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <p className="login" onClick={()=> setShowLogin(true)}>Log In</p>
        <p className="signup" onClick={()=> setShowSignUp(true)}>Sign Up</p>
      </>
    );
  }

  function toggleModal(){
    setShowLogin(!showLogin)
  }
  function toggleModalSignUp(){
    setShowSignUp(!showSignUp)
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
    {showSignUp && (<SignupFormPage toggleModalSignUp={toggleModalSignUp}></SignupFormPage>)}
    </>
  );
}

export default Navigation;
