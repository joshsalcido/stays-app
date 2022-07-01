import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkCreateReview, thunkGetReviews } from "../store/reviews";


export default function CreateReview({spotId}){
    // const currState = useSelector(state => state)
    const userId = useSelector(state => state.session?.user?.id)
    // const userSpotsSelector = useSelector(state => state.userSpots)
    // const userSpotSelector = useSelector(state => Object.values(state.userSpots))
    // const spot = useSelector(state => state.userSpots)
    // console.log(spot, "<---- Spot")
    // let values = Object.values(userSpotsSelector)
    // let userSpots =values.map((spot)=> {
    //     if (spot.userId === userId) return spot
    // })

    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState([])

    const [showForm, setShowForm] = useState(false);
    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        const newReview = {
            review,
            rating,
            spotId: spotId,
            userId: userId
        }
        // console.log(newSpot.name)
        dispatch(thunkCreateReview(newReview))
        dispatch(thunkGetReviews(spotId))
        // console.log("DISPATCHED")
        setShowForm(false);
        setReview('')
        setRating('')
    }


    // async function onDelete(spotId){
    //     dispatch(thunkDeleteSpot(spotId))
    // }
    async function revealReviewForm(e) {
        e.preventDefault()
        setShowForm(!showForm)
    }
    useEffect(()=> {
        setShowEditSpotForm(false);
    }, [userId])
    // useEffect(()=> {
    //    dispatch(thunkGetUserReviews(userId))
    //     // console.log('sent dispatch')
    // }, [dispatch])

    // useEffect(()=> {
    //     // console.log('effect spots ***:: ', spots)
    // }, [spots])


    // useEffect(()=> {
    //     if(userSpotsSelector){
    //         setSpots(Object.values(userSpotsSelector))
    //     }
    // }, [userSpotsSelector])


    // let buttonName = "Create a New Listing!"
    // if (showForm){
    //     buttonName = "Cancel"
    // }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Review:</label>
            <textarea placeholder="Write a Review"
            onChange={(e)=> setReview(e.target.value)}
            value={review}
            />
            <label>Rating:</label>
            <select
            onChange={(e)=> setRating(e.target.value)}
            value={rating}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button type="submit">Submit Review</button>
        </form>
        </>
    )
}
