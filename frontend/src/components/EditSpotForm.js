import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserSpots, thunkUpdateSpot } from "../store/spots";


const EditSpotForm = ({ spot, hideform}) => {
    // const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session?.user?.id)
    const updatedSpots = useSelector(state => state)
    // console.log(updatedSpots, "<----- Updated STATE")
    const [name, setName] = useState(spot.name)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [price, setPrice] = useState(spot.price)
    const [spots, setSpots] = useState([])

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    // const [hideForm, setHideForm] = useState(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSpot = {
            name,
            address,
            city,
            state,
            country,
            price,
            spotId: spot.id
        }

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Please fill out form properly")
        // dispatch(thunkUpdateSpot(updatedSpot));
    await dispatch(thunkUpdateSpot(updatedSpot))
            .then(dispatch(thunkGetUserSpots(userId)))

        let updateSpot = true;
        if (updateSpot) {
            hideform();
        }

        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setPrice(0)
        setSpots([])
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideform();
    }
    useEffect(()=> {
        dispatch(thunkGetUserSpots(userId))
    }, [dispatch]);
    // useEffect(()=> {
    //     dispatch(thunkUpdateSpot(spot))
    // }, [dispatch])


    useEffect(()=> {
        if(updatedSpots){
            setSpots(Object.values(updatedSpots))
        }
    }, [updatedSpots])

    return (
        <>
        { (<section className="edit-form">
            <form onSubmit={handleSubmit}>
            {hasSubmitted && validationErrors.length > 0 && <ul className="errors" >
                  {validationErrors.map((errors)=> (
                      <li key={errors}>{errors}</li>
                      ))}
                </ul>}
                <label>Title:</label>
                <input
                    required
                    value={name}
                    onChange={updateName}/>
                <label>Address:</label>
                <input
                    required
                    value={address}
                    onChange={updateAddress}/>
                <label>City:</label>
                <input
                    required
                    value={city}
                    onChange={updateCity}/>
                <label>State:</label>
                <input
                    required
                    value={state}
                    onChange={updateState}/>
                <label>Country:</label>
                <input
                    required
                    value={country}
                    onChange={updateCountry}/>
                <label>Price:</label>
                <input
                    required
                    value={price}
                    onChange={updatePrice}/>
                <button type="submit">Update Stay!</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>)}
        </>
    )
}

export default EditSpotForm;
