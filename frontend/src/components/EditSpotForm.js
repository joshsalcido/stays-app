import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserSpots } from "../store/spots";


const EditSpotForm = ({ spot, hideform}) => {
    // const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    const [name, setName] = useState(spot.name)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [price, setPrice] = useState(spot.price)
    // const [spots, setSpots] = useState([])

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    useEffect(()=> {
        dispatch(thunkGetUserSpots())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updateSpot;
        if (updateSpot) {
            // hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        // hideForm();
    }

    return (
        <section className="edit-form">
            <form onSubmit={handleSubmit}>
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
        </section>
    )
}

export default EditSpotForm;
