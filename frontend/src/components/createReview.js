import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkCreateReview, thunkGetReviews } from "../store/reviews";


export default function CreateReview({spotId}){

    const userId = useSelector(state => state.session?.user?.id)


    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1);
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

        dispatch(thunkCreateReview(newReview))
        dispatch(thunkGetReviews(spotId))

        setShowForm(false);
        setReview('')
        setRating(1)
    }



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
            required={true}
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
