import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './profileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button className="menu-btn" onClick={openMenu}>
        <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
        </div>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <Link to={`/user/${user.id}`}>
          <button className="my-profile-bttn" type="button">My Profile</button>
          </Link>
          <Link to={`/bookedTrips/${user.id}`}>
          <button className="booked-trips">Booked Trips</button>
          </Link>
          <Link>
          <button className="booked-trips">Your Listings</button>
          </Link>
            <button className="logout-bttn" onClick={logout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
