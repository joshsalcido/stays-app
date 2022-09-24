import { useState } from 'react';
import { thunkCreateBooking } from '../../store/bookings';
import '../Booking/bookingform.css'
import Moment from 'moment';
import { useDispatch, useSelector} from 'react-redux';

export default function BookingForm({indSpot}){
    const dispatch= useDispatch()


    const spotId = indSpot.id
    const userId = useSelector(state => state.session?.user?.id)


    const [checkOutOn, setCheckOutOn] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut,  setCheckOut] = useState('')

    const today = new Date()
    const todayFormatted = Moment(today).format("YYYY-MM-DD")
    const tomorrow = today.setDate(today.getDate() + 1);
    const tomorrowFormatted = Moment(tomorrow).format("YYYY-MM-DD");
    const checkInFormatted = Moment(checkIn).format("YYYY-MM-DD")
    const checkInDate = new Date(checkInFormatted)
    const checkOutMin = checkInDate.setDate(checkInDate.getDate() + 2)
    const checkOutMinFormatted = Moment(checkOutMin).format("YYYY-MM-DD")

    async function handleSubmit(e) {

        const newBooking = {
            userId,
            spotId,
            startDate: checkIn,
            endDate: checkOut
        }

        dispatch(thunkCreateBooking(newBooking))

    }
    // console.log(checkOutMinFormatted, "CHECKIN VALUE")

    return (
        <>
        <form className='booking-form' onSubmit={handleSubmit}>
            <h4 className="span-price">${parseInt(indSpot.price).toLocaleString("en-Us")} <span>night</span></h4>
            <div className="checkin-out-div-container">
                <div className="checkin-div">
                    <label className="checkin-label">CHECK-IN</label>
                    <input required className="checkin-input" type="date" min={todayFormatted} onChange={(e) => {setCheckOutOn(false); setCheckOut(''); setCheckIn(e.target.value)}}></input>
                </div>
                <div className="checkout-div">
                    <label className="checkout-label">CHECKOUT</label>
                <input required className="checkout-input" type="date" min={checkOutMinFormatted} value={checkOut}  disabled={checkIn.length === 0} onChange={(e) => setCheckOut(e.target.value)}></input>
                </div>
            </div>
            <button>Reserve</button>
            <p>Cleaning Fee</p>
            <p>Service Fee</p>
            <p>Total Before Taxes</p>
        </form>
        </>
    )
}
