import '../UserListings/userListings.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../../store/spots";
import { thunkGetAllBookings,  thunkDeleteBooking } from "../../store/bookings";
import EditSpotForm from "../EditSpotForm";
import CreateReview from "../createReview";
import Moment from 'moment';
import CreateListingForm from "../UserListings/createListingForm.js";
import ReactModal from 'react-modal'
import friends from './friends-hanging.jpg'

ReactModal.setAppElement('body')



export default function UserListings(){
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
    const [cancelCheck, setCancelCheck] = useState(false);
    const [selectBooking, setSelectBooking] = useState('')

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
        setCancelCheck(false)
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
    // if (showForm){
    //     buttonName = "Cancel"
    // }
    let yourListings = "Your Listings";
    if (Object.values(currState.userSpots).length === 0) {
        yourListings = "You have no Listings, Create one!"
    }
    let numberRegex = /\d+/;

    useEffect(() => {
        dispatch(thunkGetAllBookings(userId))
    }, [dispatch])

    function toggleListingForm(){
        setShowForm(!showForm)
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0,0,0,0.2)'
          },
        content: {
            top: '49%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '15px',

        }
    }
    return (
        <>
        <ReactModal isOpen={showEditSpotForm} style={customStyles}>
            <div className="edit-spot-form">
                <EditSpotForm
                spot={selectedSpot}
                hideform={()=> setShowEditSpotForm(false)}
                />
            </div>
        </ReactModal>
        <ReactModal isOpen={showForm} style={customStyles} onRequestClose={() => setShowForm(false)} shouldCloseOnOverlayClick={true}>
            <CreateListingForm toggleListingForm={toggleListingForm}></CreateListingForm>
        </ReactModal>

         <div className="listing-page-container">
            <div className="inner-middle-container-listing">
                <div className="listings-div">
                    <div>
                    {Object.values(currState.userSpots).length === 0 && <h2 className="your-listing-h2-message">{yourListings}</h2>}
                    {userId && Object.values(currState.userSpots).length === 0 && <button className='create-listing-bttn' onClick={revealCreateForm}>{buttonName}</button>}
                    </div>
                    {Object.values(currState.userSpots).length === 0 && (<img className='friends-img' src={friends}></img>)}
                    <div className="all-your-listings">
                        {Object.values(currState.userSpots).length > 0 && (
                        <div style={{display: 'flex'}}>
                            <h2 style={{padding: '0px', width: '11rem', marginLeft: '17px', marginRight: '20px'}}>Your Listings</h2>
                            <button style={{padding: '0px', height: '2.5rem', margin: 'auto', width: '9rem'}} onClick={revealCreateForm}>Create New Listing</button>
                        </div>)}
                        {userId && spots.map(spot => (
                          <>
                          <ReactModal isOpen={cancelCheck} style={customStyles} onRequestClose={() => setCancelCheck(false)} shouldCloseOnOverlayClick={true}>
                                <p style={{fontFamily: 'Montserrat'}}>Are you sure you want to delete this listing?</p>
                                <button style={{width:'8rem', marginLeft: '30%', fontSize: '15px'}} onClick={() => onDelete(spot.id)}>Delete</button>
                            </ReactModal><div key={spot.id}>
                                    {spot.userId === userId && spot.userId && (
                                        <div className="full-listing" key={spot.id}>
                                            <div style={{ display: 'grid', marginLeft: '0px', float: 'left', padding: "0px" }}>
                                                <img className="your-listing-img" alt="airbnb-Image" src={spot.url1 === '' ? "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" : spot.url1}></img>
                                                <div className="edit-delete">
                                                    <button className='delete-listing-button' type='button' onClick={() => setCancelCheck(true)}>Delete Listing</button>
                                                    <button className='edit-listing-bttn' type='button' onClick={() => { setShowEditSpotForm(true); setShowEditButton(false); setSelectedSpot(spot); } }>Edit Listing</button>
                                                </div>
                                            </div>
                                            <div className='listing-info-div'>
                                                <h4 className="span-name">{spot.name}</h4>
                                                <p className="p-tag-descritpion">{spot.description}</p>
                                                <label className='address-label-listing'>Address:</label>
                                                <p className="your-address">{spot.address}</p>
                                                <p className="your-city">{spot.city}, {spot.state}, {spot.country}</p>
                                                <h4 className="your-price">Price: ${parseInt(spot.price).toLocaleString("en-Us")}/ Night</h4>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                </div>
                                </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
