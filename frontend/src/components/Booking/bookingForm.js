import '../Booking/bookingform.css'

export default function BookingForm(){
    return (
        <>
        <form className='booking-form'>
            <input type="date"></input>
            <input type="date"></input>
            <button>Reserve</button>
            <p>Cleaning Fee</p>
            <p>Service Fee</p>
            <p>Total Before Taxes</p>
        </form>
        </>
    )
}
