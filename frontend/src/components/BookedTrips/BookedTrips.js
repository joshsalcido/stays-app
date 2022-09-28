import '../BookedTrips/trips.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import {thunkDeleteBooking, thunkGetAllBookings} from '../../store/bookings'
import Moment from 'moment';
import { NavLink, useParams } from 'react-router-dom'
import travelingPic from '../BookedTrips/travelingAirport.jpg'

ReactModal.setAppElement('body')

export default function BookedTrips(){
    const dispatch = useDispatch()
    const currState = useSelector(state => state)
    const { paramsId } = useParams()
    const userId = useSelector(state => state.session?.user?.id)
    const userSpotsSelector = useSelector(state => state.userSpots)
    const bookings = Object.values(currState.bookingReducer).reverse()
    const userBookings = bookings.filter(booking => booking.userId === userId)

    const [cancelCheck, setCancelCheck] = useState(false);
    const [selectBooking, setSelectBooking] = useState('')

    useEffect(() => {
        dispatch(thunkGetAllBookings(userId))
    }, [dispatch])


    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0,0.06)'
          },
        content: {
            top: '35%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '15px',

        }
    }

    // console.log(paramsId, "userBOOKING IN BOOKEdTRIPS")


    return (
        <>
        <div className="bookings-containder-div">
            {userBookings.length === 0 && (
            <div className='no-bookings-message-container'>
                <div className='div-next-to-photo'>
                    <h2 className='no-trips-yet-h2'>No trips booked...yet!</h2>
                    <p className='no-trips-message'>Time to dust off your bags and start planning your next adventure</p>
                    <NavLink to="/">
                        <button className='start-searching'>Start searching</button>
                    </NavLink>
                </div>
                <img className='traveling-photo' src={travelingPic}></img>
            </div>)}
            <div className='booked-trips-div'>
                {userBookings.length > 0 && (<h2 className="booked-trips-h2">Booked Trips</h2>)}
            </div>
            {userBookings.map(booking => (
                <div className="indv-booking-div">
                    <NavLink to={`/spot/${booking.Spot.id}`}>
                    <img className="booking-img" src={booking.Spot.url1}></img>
                    </NavLink>
                    <div className="booking-info-div">
                        <div style={{display: 'flex', width: '100%'}}>
                            <p className="booked-info-city">{booking.Spot.city}</p>
                            <button className="cancel-trip-btn" onClick={() => {setCancelCheck(true); setSelectBooking(booking.id)}} >Cancel Trip</button>
                            <ReactModal isOpen={cancelCheck} style={customStyles} onRequestClose={() => setCancelCheck(false)}  shouldCloseOnOverlayClick={true}>
                                <p style={{fontFamily: 'Montserrat'}}>Are you sure you want to Cancel this trip?</p>
                                <button style={{width:'8rem', marginLeft: '30%'}} onClick={() => {dispatch(thunkDeleteBooking(selectBooking)); setCancelCheck(false)}}>Cancel Trip</button>
                            </ReactModal>
                        </div>
                        <p className="booked-info-p-tag"> Hosted by
                        <span className="booked-info-username-tag"> {booking.Spot.User.username.charAt(0).toUpperCase() + booking.Spot.User.username.slice(1)}</span>
                        </p>
                        <p style={{fontFamily: 'Montserrat', margin: '0', color: 'rgb(183, 183, 183)'}} >Your Trip Dates:</p>
                        <p className="booked-info-p-tag">{Moment(booking.startDate).format("MMM D")} - {Moment(booking.endDate).format("MMM D, YYYY")}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
