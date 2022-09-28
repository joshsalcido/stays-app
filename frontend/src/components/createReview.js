import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkCreateReview, thunkGetReviews } from "../store/reviews";
import './review.css'
import { Rating } from 'react-simple-star-rating'


export default function CreateReview({spotId, toggleReviewForm}){

    const userId = useSelector(state => state.session?.user?.id)


    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0);
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

       await dispatch(thunkCreateReview(newReview))
       await dispatch(thunkGetReviews(spotId))
           

        toggleReviewForm();
        setReview('')
        setRating(1)
    }

    useEffect(()=> {
        dispatch(thunkGetReviews(spotId))
    }, [dispatch, userId])

    async function revealReviewForm(e) {
        e.preventDefault()
        setReviewForm(!reviewForm)
        setReview('')
        setRating(1)
    }
    function handleRating(rate){
        let starRate = rate / 20
        setRating(starRate)
    }

    let reviewButton = "Leave a Review!"
    if (reviewForm){
        reviewButton = "Cancel Review"
    }


    return (
        <>
            {/* {userId && <div className="create-review"> <button  onClick={revealReviewForm}>{reviewButton}</button> </div>} */}
        {(
        <form className="review-form" onSubmit={handleSubmit}>
             {hasSubmitted && validationErrors.length > 0 && (
             <ul className="errors">
                  {validationErrors.map((errors)=> (
                      <li key={errors}>{errors}</li>
                      ))}
             </ul>)}
            {/* <label className="review-label">Review:</label> */}
            <Rating onClick={handleRating} ratingValue={rating}></Rating>
            <textarea placeholder="Write a Review"
            onChange={(e)=> setReview(e.target.value)}
            value={review}
            required={true}
            />
            {/* <label className="rating-label">Rating:</label> */}
            {/* <select
            className="rating-dropdown-menu"
            onChange={(e)=> setRating(e.target.value)}
            value={rating}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select> */}
            <div className="review-form-bttns-div">
                <button className="submit-review-btn" type="submit">Submit Review</button>
                <button className="cancel-review-btn" type="button" onClick={() => toggleReviewForm()}>Cancel Review</button>
            </div>
        </form>)
        }
        </>
    )
}
