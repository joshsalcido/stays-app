import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";

export default function SpotForm(){
    const currState = useSelector(state => state)
    const userId = useSelector(state => state.session?.user?.id)
    const userSpotsSelector = useSelector(state => state.userSpots)
    // const userSpotSelector = useSelector(state => Object.values(state.userSpots))
    const spot = useSelector(state => state.userSpots)
    console.log(spot, "<---- Spot")
    // let values = Object.values(userSpotsSelector)
    // let userSpots =values.map((spot)=> {
    //     if (spot.userId === userId) return spot
    // })

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState(0)
    const [spots, setSpots] = useState([])

    const [showForm, setShowForm] = useState(false);
    const [showEditSpotForm, setShowEditSpotForm] = useState(false);

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
        console.log(newSpot.name)
        dispatch(thunkCreateSpot(newSpot))
        console.log("DISPATCHED")

        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setPrice(0)
    }

    async function onDelete(spotId){

        console.log("Hi DELETE EEEEE HERE")
    }
    async function revealCreateForm(e) {
        e.preventDefault()
        setShowForm(!showForm)
    }
    useEffect(()=> {
        setShowEditSpotForm(false);

    }, [userId])
    useEffect(()=> {
        dispatch(thunkGetUserSpots(userId))
        // console.log('sent dispatch')
    }, [dispatch])

    useEffect(()=> {
        // console.log('effect spots ***:: ', spots)
    }, [spots])


    useEffect(()=> {
        if(userSpotsSelector){
            setSpots(Object.values(userSpotsSelector))
        }
    }, [userSpotsSelector])
    let editContent = null;
    if (showEditSpotForm) {
        editContent= (
            <EditSpotForm
            spot={spot}
            hideForm={()=> setShowEditSpotForm(false)}
            />
        )
    }

    let buttonName = "Create a New Listing!"
    if (showForm){
        buttonName = "Cancel"
    }

    return (
        <>
        {userId && <button onClick={revealCreateForm}>{buttonName}</button>}
        {showForm && (
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                />
                <label>Address:</label>
                <input
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                />
                <label>City:</label>
                <input
                onChange={(e)=> setCity(e.target.value)}
                value={city}
                />
                <label>State:</label>
                <input
                onChange={(e)=> setState(e.target.value)}
                value={state}
                />
                <label>Country:</label>
                <input
                onChange={(e)=> setCountry(e.target.value)}
                value={country}
                />
                <label>Price:</label>
                <input
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
                />
                <button type="submit">Create Spot</button>
            </form>)
         }


        <br/>
        {userId && spots.map(spot => (
            <div>
                {spot.userId === userId && spot.userId && (
                    <div key={spot.id}>
                       <h4 class="span-name">{spot.name}</h4>
                       <span class="span-address">Address: {spot.address}</span>
                       <br/>
                       <span class="span-city">City: {spot.city}</span>
                       <br/>
                       <span class="span-state">State: {spot.state}, {spot.country}</span>
                       <h4 class="span-price">Price: ${spot.price}/ Night</h4>
                       <div class="edit/delete">
                            <button type='button' onClick={()=> onDelete(spot.id)}>Delete Stay</button>
                            <button type='button' onClick={()=> setShowEditSpotForm(true)}>Edit Stay</button>
                       </div>
                       <br/>
                   </div>
                )}
            </div>
        ))}
        </>
    )
}