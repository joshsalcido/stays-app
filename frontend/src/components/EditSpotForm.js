import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserSpots, thunkUpdateSpot } from "../store/spots";
import './UserProfile/UserProfile.css'


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
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [url1, setUrl1] = useState(spot.url1 || '')
    const [url2, setUrl2] = useState(spot.url2 || '')
    const [url3, setUrl3] = useState(spot.url3 || '')
    const [url4, setUrl4] = useState(spot.url4 || '')
    const [url5, setUrl5] = useState(spot.url5 || '')
    const [spots, setSpots] = useState([])

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateUrl1 = (e) => setUrl1(e.target.value);
    const updateUrl2 = (e) => setUrl2(e.target.value);
    const updateUrl3 = (e) => setUrl3(e.target.value);
    const updateUrl4 = (e) => setUrl4(e.target.value);
    const updateUrl5 = (e) => setUrl5(e.target.value);

    // const [hideForm, setHideForm] = useState(true);
    useEffect(()=> {
        const errors = [];

        let numberRegex = /\d+/;
        let imageFileRegex = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

        if (name.length < 3) errors.push("Please enter a longer Title")
        if (!address) errors.push("Please enter an address")
        if (!city) errors.push("Please enter a city")
        if (!state) errors.push("Please enter a state")
        if (!country) errors.push("Please enter a country")
        if (!numberRegex.test(price)) errors.push("Price must be a number")
        if (price <= 0) errors.push("Price minimum $1")
        if (price.length > 8) errors.push("Price too expensive!")
        if (url1 && !imageFileRegex.test(url1)) errors.push("First image is not a valid file")
        if (url2 && !imageFileRegex.test(url2)) errors.push("Second image is not a valid file")
        if (url3 && !imageFileRegex.test(url3)) errors.push("Third image is not a valid file")
        if (url4 && !imageFileRegex.test(url4)) errors.push("Fourth image is not a valid file")
        if (url5 && !imageFileRegex.test(url5)) errors.push("Fifth image is not a valid file")

        setValidationErrors(errors);

    }, [name,address, city, state, country, price, url1, url2, url3, url4, url5])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            url1,
            url2,
            url3,
            url4,
            url5,
            spotId: spot.id
        }

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Double check your listing info!")
        // dispatch(thunkUpdateSpot(updatedSpot));
    dispatch(thunkUpdateSpot(updatedSpot))
    // dispatch(thunkGetUserSpots(userId))

        let updateSpot = true;
        if (updateSpot) {
            hideform();
        }

        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setDescription('')
        setPrice(0)
        setUrl1('')
        setUrl2('')
        setUrl3('')
        setUrl4('')
        setUrl5('')
        setSpots([])
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideform();
    }
    useEffect(()=> {
        dispatch(thunkGetUserSpots(userId))
    }, [dispatch, userId]);
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
            <form className="edit-spotForm" onSubmit={handleSubmit}>
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
                <label>Description</label>
                <textarea
                    required
                    value={description}
                    onchange={updateDescription}
                ></textarea>
                <label>Price:</label>
                <input
                    required
                    value={price}
                    onChange={updatePrice}/>
                <label>Images:</label>
                <input
                onChange={updateUrl1}
                value={url1}
                placeholder="image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={updateUrl2}
                value={url2}
                placeholder="image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={updateUrl3}
                value={url3}
                placeholder="image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={updateUrl4}
                value={url4}
                placeholder="image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={updateUrl5}
                value={url5}
                placeholder="image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>)}
        </>
    )
}

export default EditSpotForm;
