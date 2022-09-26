import { useEffect, useState } from 'react';
import { thunkCreateBooking, thunkGetAllBookings } from '../../store/bookings';
import '../Booking/bookingform.css'
import Moment from 'moment';
import { useDispatch, useSelector} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export default function BookingForm({indSpot}){
    const dispatch= useDispatch()
    const history = useHistory()

    const currState = useSelector(state => state)
    const spotId = indSpot.id
    const userId = useSelector(state => state.session?.user?.id)

    const [checkOutOn, setCheckOutOn] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut,  setCheckOut] = useState('')

    const today = new Date()
    const todayFormatted = Moment(today).format("YYYY-MM-DD")

    const checkInDate = new Date(Moment(checkIn).format("YYYY-MM-DD"))
    const checkOutDate = new Date(Moment(checkOut).format("YYYY-MM-DD"))
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    // * Divide the time difference by number of milliseconds in a day *
    const differenceInDays = timeDifference / (1000 * 3600 * 24)

    const checkOutMin = checkInDate.setDate(checkInDate.getDate() + 2)
    const checkOutMinFormatted = Moment(checkOutMin).format("YYYY-MM-DD")

    const [cleaningFee, setCleaningFee] = useState(75)
    const [serviceFee, setServiceFee] = useState(120)
    const [nightTotal, setNightTotal] = useState('')
    const [total, setTotal] = useState(cleaningFee + serviceFee + parseInt(indSpot.price))

    const [disableButtonStyling, setDisableButtonStyling] = useState(null)
    const [disableButton, setDisableButton] = useState(true)
    const [logInMessage, setLogInMessage] = useState(false)

    // console.log(nightTotal)

    function addUpTotal(){
        const total = cleaningFee + serviceFee + (parseInt(indSpot.price) * differenceInDays)
        setTotal(total);
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const newBooking = {
            userId,
            spotId,
            startDate: checkIn,
            endDate: checkOut
        }

        await dispatch(thunkCreateBooking(newBooking))
        await dispatch(thunkGetAllBookings(userId))

        // console.log(currState, "CURR STATE")
        return history.push(`/user/${userId}`);

    }

    useEffect(() => {
        if (isNaN(differenceInDays) === false){
            setNightTotal(differenceInDays * parseInt(indSpot.price))
            addUpTotal()
        } else {
            setTotal(cleaningFee + serviceFee + parseInt(indSpot.price))
        }
        if (checkOut.length === 0){
            setDisableButtonStyling({backgroundColor: '#b4d8cb'})
            setDisableButton(true)
        } else if (checkOut.length > 0 && userId !== undefined) {
            setDisableButton(false)
            setDisableButtonStyling(null)
        } else {
            setLogInMessage(true)
        }


    }, [differenceInDays])



    return (
        <>
        <form className='booking-form' onSubmit={handleSubmit}>
            <h4 className="span-price">${parseInt(indSpot.price).toLocaleString("en-Us")} <span>night</span></h4>
            <div className="checkin-out-div-container">
                <div className="checkin-div">
                    <label className="checkin-label">CHECK-IN</label>
                    <input className="checkin-input" type="date" min={todayFormatted} onChange={(e) => {setCheckOutOn(false); setCheckOut(''); setCheckIn(e.target.value)}}></input>
                </div>
                <div className="checkout-div">
                    <label className="checkout-label">CHECKOUT</label>
                <input className="checkout-input" type="date" min={checkOutMinFormatted} value={checkOut}  disabled={checkIn.length === 0} onChange={(e) => setCheckOut(e.target.value)}></input>
                </div>
            </div>
                {logInMessage && (<h4 style={{margin: 'auto', marginTop: '15px', marginBottom: '15px', color: '#77aa97'}}>Log in or Sign up to reserve this Stay!</h4>)}
                <button disabled={disableButton} style={disableButtonStyling}>Reserve</button>
            {isNaN(differenceInDays) === false && (<p className='nights-total'>${indSpot.price} x {differenceInDays} nights<span className='span-nights-total'>${nightTotal.toLocaleString("en-Us")}</span></p>)}
            <p className='cleaning-fee'>Cleaning Fee<span className='span-cleaning-fee'>${cleaningFee}</span></p>
            <p className='service-fee'>Service Fee<span className='span-service-fee'>${serviceFee}</span></p>
            <p className='grand-total'>Total before taxes<span className='span-grand-total'>${total.toLocaleString("en-Us")}</span></p>
        </form>
        </>
    )
}
