import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";
import CreateReview from "./createReview";

export default function SpotForm(){
    const currState = useSelector(state => state)
    const userId = useSelector(state => state.session?.user?.id)
    const userSpotsSelector = useSelector(state => state.userSpots)

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState('')
    const [spots, setSpots] = useState([])



    const [showForm, setShowForm] = useState(false);
    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(()=> {
        const errors = [];

        let numberRegex = /\d+/
        if (name.length < 3) errors.push("Please enter a longer Title")
        if (!address.length) errors.push("Please enter an address")
        if (!city.length) errors.push("Please enter a city")
        if (!state.length) errors.push("Please enter a state")
        if (!country.length) errors.push("Please enter a country")
        if (!numberRegex.test(price)) errors.push("Price must be a number")

        setValidationErrors(errors);

    }, [name,address, city, state, country, price])



    async function handleSubmit(e){
        e.preventDefault();
        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            price,
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
    return (
        <>
        {userId && <button onClick={revealCreateForm}>{buttonName}</button>}
        {showForm && (
            <form onSubmit={handleSubmit}>
                {hasSubmitted && validationErrors.length > 0 && <ul className="errors">
                  {validationErrors.map((errors)=> (
                      <li key={errors}>{errors}</li>
                      ))}
                </ul>}
                <label>Name:</label>
                <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                required={true}
                />
                <label>Address:</label>
                <input
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                required={true}
                />
                <label>City:</label>
                <input
                onChange={(e)=> setCity(e.target.value)}
                value={city}
                required={true}
                />
                <label>State:</label>
                <input
                onChange={(e)=> setState(e.target.value)}
                value={state}
                required={true}
                />
                <label>Country:</label>
                <input
                onChange={(e)=> setCountry(e.target.value)}
                value={country}
                required={true}
                />
                <label>Price Per Night:</label>
                <input
                placeholder="numbers only"
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
                required={true}
                />
                <button type="submit">Create Spot</button>
            </form>)
         }
                {userSpotsSelector && <h2 className="your-listing">{yourListings}</h2>}


        <br/>
        {userId && spots.map(spot => (
            <div key={spot.id}>
                {selectedSpot === spot.id && showEditSpotForm && (
                <div>
                    <EditSpotForm
                    spot={spot}
                    hideform={()=> setShowEditSpotForm(false)}
                    />
                </div>
                )}
                {spot.userId === userId && spot.userId && (
                    <div key={spot.id}>
                       <h4 className="span-name">{spot.name}</h4>
                       <span className="span-address">Address: {spot.address}</span>
                       <br/>
                       <span className="span-city">City: {spot.city}</span>
                       <br/>
                       <span className="span-state">State: {spot.state}, {spot.country}</span>
                       <h4 className="span-price">Price: ${parseInt(spot.price).toLocaleString("en-Us")}/ Night</h4>
                       <div className="edit/delete">
                            <button type='button' onClick={()=> onDelete(spot.id)}>Delete Stay</button>
                            <button type='button' onClick={()=> { setShowEditSpotForm(true); setSelectedSpot(spot.id)}}>Edit Stay</button>
                       </div>
                       <br/>
                   </div>
                )}
            </div>
        ))}
        </>
    )
}
