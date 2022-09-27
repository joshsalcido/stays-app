import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../../store/spots";
import { thunkGetAllBookings,  thunkDeleteBooking } from "../../store/bookings";
import { NavLink } from "react-router-dom";
import './UserProfile.css'
import Moment from 'moment';
import ReactModal from 'react-modal'
import userProfileImg from './userprofileimg.jpg'
import workInProgress from './work-in-progress1.png'

ReactModal.setAppElement('body')

export default function UserProfilePage(){
    const userSession = useSelector(state => state.session.user)
    const userId = useSelector(state => state.session?.user?.id)
    const username = userSession.username
    const email = userSession.email

    const dispatch = useDispatch();




    // console.log(Object.values(currState.bookingReducer), "BookingReducer")
    // console.log(email, "User Bookings")

    return (
        <div className="main-profile-container">
            <div className='profile-conatiner-for-img-and-info'>
                <div className='div-next-to-photo-profile'>
                    <h2 className='welcome-user'>Welcome {username}!</h2>
                    <p className="user-email">{email}</p>
                    <img className="work-in-progress" src={workInProgress}></img>
                    <p className='no-info-yet'>Not much to see here...yet! Feel free to start exploring our stays, leave a review, book one and create your own! </p>
                    <NavLink to="/">
                        <button className='explore-bttn'>Explore</button>
                    </NavLink>
                </div>
                <img className='profile-message-photo' src={userProfileImg}></img>
            </div>
        </div>
    )
}
