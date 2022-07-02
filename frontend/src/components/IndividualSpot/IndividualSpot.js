
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../../store/spots";
import EditSpotForm from "../EditSpotForm";
import { thunkGetIndividualSpot } from "../../store/spot";

import { thunkDeleteReview, thunkGetReviews } from "../../store/reviews";
import { Link, useParams } from "react-router-dom";
import CreateReview from "../createReview";
import './individualSpot.css'

export default function IndividualSpot(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const idNum = parseInt(id);


    const indSpotObj = useSelector(state => state.singleSpot)
    const indSpot = indSpotObj[idNum]
    const userId = useSelector(state => state.session.user?.id)


    const reviewsObj = useSelector(state => state.reviewReducer)
    const reviews = Object.values(reviewsObj);




    async function onDelete(reviewId){
        dispatch(thunkDeleteReview(reviewId, idNum))
        dispatch(thunkGetReviews(idNum))
    }

    useEffect(()=>{
        dispatch(thunkGetIndividualSpot(idNum))
        dispatch(thunkGetReviews(idNum))
    }, [dispatch, idNum])


   
    let reviewsTitle = "Reviews"
    if (!reviews.length) {
        reviewsTitle = "Be the first to Leave a Review!"
    }




    return (
        <div>
        {indSpot &&
        <div>
            <h4 className="span-title">{indSpot.name}</h4>
            <img></img>
            <span className="span-address">{indSpot.address}</span>
            <br></br>
            <span className="span-state"> {indSpot.city}, {indSpot.state}, {indSpot.country}</span>
            <h4 className="span-price">Price: ${parseInt(indSpot.price).toLocaleString("en-Us")}/ Night</h4>
        </div>
        }
            {<div><CreateReview spotId={id}/></div>}
            <div>
                {reviews && (
                    <h4>{reviewsTitle}</h4>
                )}
                { reviews && reviews.map((review) => (
                    <div key={review.id}>
                    {(
                        <div className="reviewBox">
                           {/* <h5>{user.username}</h5> */}
                           {/* {userId && review.userId === userId && */}
                           <h5>Rating: {review.rating}</h5>
                           <span>{review.review}</span>
                           {userId && userId === review.userId && (
                            <button onClick={()=> onDelete(review.id)}>Delete Your Review!</button>
                           )}
                       </div>
                    )}
                </div>
                ))}
            </div>
        </div>

    )
};
