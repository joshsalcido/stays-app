import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkCreateSpot, thunkDeleteSpot, thunkGetUserSpots } from "../../store/spots"
import '../UserProfile/UserProfile.css'


export default function CreateListingForm({toggleListingForm}){
    const currState = useSelector(state => state)
    const userId = useSelector(state => state.session?.user?.id)
    const userSpotsSelector = useSelector(state => state.userSpots)
    const userBookings = Object.values(currState.bookingReducer)

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')
    const [url4, setUrl4] = useState('')
    const [url5, setUrl5] = useState('')
    const [spots, setSpots] = useState([])



    // let [showForm, setShowForm] = useState(false);
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
            description,
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

        toggleListingForm()
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setDescription('')
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
    // async function revealCreateForm(e) {
    //     e.preventDefault()
    //     setShowForm(!showForm)
    //     setName('')
    //     setAddress('')
    //     setCity('')
    //     setState('')
    //     setCountry('')
    //     setPrice('')
    //     setUrl1('')
    //     setUrl2('')
    //     setUrl3('')
    //     setUrl4('')
    //     setUrl5('')
    //     setValidationErrors([])
    // }
    useEffect(()=> {
        setShowEditSpotForm(false);
    }, [userId])
    useEffect(()=> {
       dispatch(thunkGetUserSpots(userId))
    }, [dispatch])


    return (
        <>
        { (
            <form className="spot-form" onSubmit={handleSubmit}>
                {hasSubmitted && validationErrors.length > 0 && <ul className="errors">
                  {validationErrors.map((errors)=> (
                      <li className="errors" key={errors}>{errors}</li>
                      ))}
                </ul>}
                <label>Title</label>
                <input
                maxLength={60}
                className="create-listing-inputs"
                onChange={(e)=> setName(e.target.value)}
                value={name}
                required={true}
                />
                <label>Address</label>
                <input
                className="create-listing-inputs"
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                required={true}
                />
                <label>City</label>
                <input
                className="create-listing-inputs"
                onChange={(e)=> setCity(e.target.value)}
                value={city}
                required={true}
                />
                <div style={{padding: '0', marginTop: '10px', marginBottom: '10px'}}>
                    <label>State</label>
                    <input
                    style={{marginRight:'22px'}}
                    className="create-listing-inputs"
                    onChange={(e)=> setState(e.target.value)}
                    value={state}
                    required={true}
                    />
                    <label>Country</label>
                    <input
                    className="create-listing-inputs-country"
                    onChange={(e)=> setCountry(e.target.value)}
                    value={country}
                    required={true}
                    />
                </div>
                <label>Description</label>
                <textarea
                maxLength={2000}
                className="description-textarea"
                onChange={(e)=> setDescription(e.target.value)}
                value={description}
                required={true}
                ></textarea>
                <div style={{ marginTop: '10px'}}>
                    <label>Price/Night</label>
                    <input
                    className="create-listing-inputs-price"
                    placeholder="digits"
                    onChange={(e)=> setPrice(e.target.value)}
                    value={price}
                    required={true}
                    />
                    <label>Add Image</label>
                    <input
                    className="create-listing-inputs-firstImage"
                    required
                    onChange={(e)=> setUrl1(e.target.value)}
                    value={url1}
                    placeholder="this image will be displayed 1st, image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                    />
                </div>
                <label>Aditional Images</label>
                <input
                className="create-listing-inputs"
                onChange={(e)=> setUrl2(e.target.value)}
                value={url2}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                className="create-listing-inputs"
                onChange={(e)=> setUrl3(e.target.value)}
                value={url3}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                className="create-listing-inputs"
                onChange={(e)=> setUrl4(e.target.value)}
                value={url4}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                className="create-listing-inputs"
                onChange={(e)=> setUrl5(e.target.value)}
                value={url5}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <div style={{display: 'flex'}}>
                    <button style={{width: '50%', marginRight: '12px'}} type="submit">Submit Listing</button>
                    <button style={{width: '50%'}} onClick={toggleListingForm}>Cancel</button>
                </div>
            </form>)
            }
        </>
    )
}
