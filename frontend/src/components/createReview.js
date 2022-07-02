import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkCreateReview, thunkGetReviews } from "../store/reviews";
import './review.css'


export default function CreateReview({spotId}){

    const userId = useSelector(state => state.session?.user?.id)


    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([])

    const [showForm, setShowForm] = useState(true);
    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [reviewForm, setReviewForm] = useState(false)

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(()=> {
        const errors = [];

        if (review.length < 5) errors.push("Please enter a review longer than 5 characters")

        setValidationErrors(errors);

    }, [review])

    async function handleSubmit(e){
        e.preventDefault();
        const newReview = {
            review,
            rating,
            spotId: spotId,
            userId: userId
        }

        setHasSubmitted(true);
        if (validationErrors.length) return alert("Please leave a longer review")

        dispatch(thunkCreateReview(newReview))
        dispatch(thunkGetReviews(spotId))

        setReviewForm(false);
        setReview('')
        setRating(1)
    }

    async function revealReviewForm(e) {
        e.preventDefault()
        setReviewForm(!reviewForm)
        setReview('')
        setRating(1)
    }

    let reviewButton = "Leave a Review!"
    if (reviewForm){
        reviewButton = "Cancel Review"
    }


    return (
        <>
            {userId && <button onClick={revealReviewForm}>{reviewButton}</button>}
        {reviewForm &&
        (
        <form className="review-form" onSubmit={handleSubmit}>
             {hasSubmitted && validationErrors.length > 0 && (
             <ul className="errors">
                  {validationErrors.map((errors)=> (
                      <li key={errors}>{errors}</li>
                      ))}
             </ul>)}
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
        </form>)
        }
        </>
    )
}
