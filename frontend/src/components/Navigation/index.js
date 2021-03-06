import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="login">Log In</NavLink>
        <NavLink to="/signup" className="signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navBar'>
      <ul>
        <li>
            <NavLink exact to="/" className="home">stays</NavLink>
            {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
