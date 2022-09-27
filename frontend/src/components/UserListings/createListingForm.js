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
                <label>Title:</label>
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
                 <label>Add Images:</label>
                <input
                required
                onChange={(e)=> setUrl1(e.target.value)}
                value={url1}
                placeholder="(this image will be displayed in your listings) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={(e)=> setUrl2(e.target.value)}
                value={url2}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={(e)=> setUrl3(e.target.value)}
                value={url3}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={(e)=> setUrl4(e.target.value)}
                value={url4}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <input
                onChange={(e)=> setUrl5(e.target.value)}
                value={url5}
                placeholder="(optional) image url ending in .jpg,.jpeg,.gif,.tiff,.png"
                />
                <button type="submit">Submit Listing</button>
                <button onClick={toggleListingForm}>Cancel</button>
            </form>)
            }
        </>
    )
}
