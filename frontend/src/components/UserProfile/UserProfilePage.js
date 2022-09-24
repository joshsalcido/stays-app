import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../../store/spots";
import { thunkGetAllBookings,  thunkDeleteBooking } from "../../store/bookings";
import EditSpotForm from "../EditSpotForm";
import CreateReview from "../createReview";
import './UserProfile.css'
import Moment from 'moment';
import CreateListingForm from "./createListingForm";

export default function UserProfilePage(){
    const currState = useSelector(state => state)
    const userId = useSelector(state => state.session?.user?.id)
    const userSpotsSelector = useSelector(state => state.userSpots)
    const userBookings = Object.values(currState.bookingReducer).reverse()

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')
    const [url4, setUrl4] = useState('')
    const [url5, setUrl5] = useState('')
    const [spots, setSpots] = useState([])



    const [showForm, setShowForm] = useState(false);
    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);

    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(()=> {
        const errors = [];

        let numberRegex = /\d+/;
        let imageFileRegex = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

        if (name.length < 3) errors.push("Please enter a longer Title")
        if (!address.length) errors.push("Please enter an address")
        if (!city.length) errors.push("Please enter a city")
        if (!state.length) errors.push("Please enter a state")
        if (!country.length) errors.push("Please enter a country")
        if (!numberRegex.test(price)) errors.push("Price must be a number")
        if (price <= 0) errors.push("Price minimum $1")
        if (price.length > 8) errors.push("Price too expensive!")
        if (url1.length && !imageFileRegex.test(url1)) errors.push("First image is not a valid file")
        if (url2.length && !imageFileRegex.test(url2)) errors.push("Second image is not a valid file")
        if (url3.length && !imageFileRegex.test(url3)) errors.push("Third image is not a valid file")
        if (url4.length && !imageFileRegex.test(url4)) errors.push("Fourth image is not a valid file")
        if (url5.length && !imageFileRegex.test(url5)) errors.push("Fifth image is not a valid file")

        setValidationErrors(errors);

    }, [name, address, city, state, country, price, url1, url2, url3, url4, url5])



    async function handleSubmit(e){
        e.preventDefault();
        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            price,
            url1,
            url2,
            url3,
            url4,
            url5,
            userId: userId
        }

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Double check your listing info!")

        dispatch(thunkCreateSpot(newSpot))

        setShowForm(false);
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setPrice('')
        setUrl1('')
        setUrl2('')
        setUrl3('')
        setUrl4('')
        setUrl5('')

    }


    async function onDelete(spotId){
        dispatch(thunkDeleteSpot(spotId))
    }
    async function revealCreateForm(e) {
        e.preventDefault()
        setShowForm(!showForm)
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setPrice('')
        setUrl1('')
        setUrl2('')
        setUrl3('')
        setUrl4('')
        setUrl5('')
        setValidationErrors([])
    }
    useEffect(()=> {
        setShowEditSpotForm(false);
    }, [userId])
    useEffect(()=> {
       dispatch(thunkGetUserSpots(userId))
    }, [dispatch])




    useEffect(()=> {
        if(userSpotsSelector){
            setSpots(Object.values(userSpotsSelector))
        }
    }, [userSpotsSelector])


    let buttonName = "Create a New Listing!";
    if (showForm){
        buttonName = "Cancel"
    }
    let yourListings = "Your Listings:";
    if (Object.values(currState.userSpots).length === 0) {
        yourListings = "You have no Listings, Create one!"
    }
    let numberRegex = /\d+/;

    useEffect(() => {
        dispatch(thunkGetAllBookings(userId))
    }, [dispatch])

    // console.log(Object.values(currState.bookingReducer), "BookingReducer")
    console.log(userBookings, "User Bookings")

    return (
        <div className="profile-page-container">
            <div className="listings-div">
            <CreateListingForm></CreateListingForm>
                {userId && showForm === false && <button onClick={revealCreateForm}>{buttonName}</button>}
                {userSpotsSelector && showForm === false && <h2 className="your-listing">{yourListings}</h2>}
                <div className="all-your-listings">
                    {userId && spots.map(spot => (
                        <div key={spot.id}>
                            {selectedSpot === spot.id && showEditSpotForm && (
                            <div className="edit-spot-form">
                                <EditSpotForm
                                spot={spot}
                                hideform={()=> setShowEditSpotForm(false)}
                                />
                            </div>
                            )}
                            {spot.userId === userId && spot.userId && (
                                <div className="full-listing" key={spot.id}>
                                <h4 className="span-name">{spot.name}</h4>
                                <img className="your-listing-img" alt="airbnb-Image"  src={spot.url1 === '' ? "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" : spot.url1}></img>
                                <br></br>
                                <span className="your-address">{spot.address}</span>
                                <br/>
                                <span className="your-city">{spot.city}, {spot.state}, {spot.country}</span>
                                <br/>
                                <h4 className="your-price">Price: ${parseInt(spot.price).toLocaleString("en-Us")}/ Night</h4>
                                <div className="edit/delete">
                                        <button type='button' onClick={()=> onDelete(spot.id)}>Delete Listing</button>
                                        {!showEditSpotForm && (<button type='button' onClick={()=> { setShowEditSpotForm(true); setShowEditButton(false); setSelectedSpot(spot.id)}}>Edit Listing</button>)}
                                </div>
                                <br/>
                            </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bookings-containder-div">
                {userBookings.length === 0 && (<h2 className="no-trips-yet-h2">No trips booked...yet!</h2>)}
                {userBookings.length > 0 && (<h2 className="no-trips-yet-h2">Booked Trips</h2>)}
                {userBookings.map(booking => (
                    <div className="indv-booking-div">
                        <img className="booking-img" src={booking.Spot.url1}></img>
                        <div className="booking-info-div">
                            <div style={{display: 'flex', width: '100%'}}>
                                <p className="booked-info-city">{booking.Spot.city}</p>
                                <button className="cancel-trip-btn" onClick={() => {dispatch(thunkDeleteBooking(booking.id))}}>Cancel Trip</button>
                            </div>
                            <p className="booked-info-p-tag"> Hosted by
                            <span className="booked-info-username-tag"> {booking.Spot.User.username.charAt(0).toUpperCase() + booking.Spot.User.username.slice(1)}</span>
                            </p>
                            <p className="booked-info-p-tag">{Moment(booking.startDate).format("MMM D")} - {Moment(booking.endDate).format("MMM D, YYYY")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
