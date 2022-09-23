import '../Booking/bookingform.css'

export default function BookingForm({indSpot}){
    return (
        <>
        <form className='booking-form'>
            <h4 className="span-price">${parseInt(indSpot.price).toLocaleString("en-Us")} <span>night</span></h4>
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
