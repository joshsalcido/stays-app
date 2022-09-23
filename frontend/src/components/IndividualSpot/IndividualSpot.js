
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
import BookingForm from "../Booking/bookingForm";

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
        <div className="Indv-spot-div">
        {indSpot &&
        <div>
            <div className="title-address-div">
                <h4 className="span-title">{indSpot.name}</h4>
                <span className="span-address-single">{indSpot.address} {indSpot.city}, {indSpot.state}, {indSpot.country}</span>
            </div>
            <div className="image-block">
                {<div className="single-url1">
                    {indSpot.url1 === '' && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url1 !== '' && (<img className="img-url1" alt="airbnb-image" src={indSpot.url1}></img>)}
                </div>
                }
                <div className="image-block-2">
                {<div className="single-url2">
                        {indSpot.url2 === '' && (<img className="img-url2" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                        {indSpot.url2 !== '' && (<img className="img-url2" alt="airbnb-image" src={indSpot.url2}></img>)}
                    </div>
                    }
                    {<div className="single-url3">
                        {indSpot.url3 === '' && (<img className="img-url3" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                        {indSpot.url3 !== '' && (<img className="img-url3" alt="airbnb-image" src={indSpot.url3}></img>)}
                    </div>
                    }
                {<div className="single-url4">
                        {indSpot.url4 === '' && (<img className="img-url4" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                        {indSpot.url4 !== '' && (<img className="img-url4" alt="airbnb-image" src={indSpot.url4}></img>)}
                    </div>
                    }
                {<div className="single-url5">
                        {indSpot.url5 === '' && (<img className="img-url5" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                        {indSpot.url5 !== '' && (<img className="img-url5" alt="airbnb-image" src={indSpot.url5}></img>)}
                    </div>
                    }
                </div>
            </div>
            <div className="details-bookings-section-div">
                <div className="spot-details-div">
                </div>
                <div className="booking-form-div">
                    <BookingForm></BookingForm>
                </div>
            </div>
            <h4 className="span-price">Price: ${parseInt(indSpot.price).toLocaleString("en-Us")}/ Night</h4>
        </div>
        }
            {<div className="review-button-div">
                <CreateReview spotId={id}/>
            </div>}
            <div className="Review-section-div">
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
