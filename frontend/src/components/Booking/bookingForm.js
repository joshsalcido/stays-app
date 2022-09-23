import '../Booking/bookingform.css'

export default function BookingForm({indSpot}){
    return (
        <>
        <form className='booking-form'>
            <h4 className="span-price">${parseInt(indSpot.price).toLocaleString("en-Us")} <span>night</span></h4>
            <div className="checkin-out-div-container">
                <div className="checkin-div">
                    <label className="checkin-label">CHECK-IN</label>
                    <input className="checkin-input" type="date" min="2022-09-23"></input>
                </div>
                <div className="checkout-div">
                    <label className="checkout-label">CHECKOUT</label>
                <input className="checkout-input" type="date"></input>
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
