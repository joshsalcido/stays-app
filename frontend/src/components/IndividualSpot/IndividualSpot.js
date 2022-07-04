
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
    console.log(indSpot)
    let imgDisplay1;
    // if (indSpot.url1 === null) {
    //     imgDisplay1 = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    // } else {
    //     imgDisplay1 = indSpot.url1
    // }
    let imgDisplay2;
    // if (indSpot.url2 === null) {
    //     imgDisplay2 = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    // } else {
    //     imgDisplay2 = indSpot.url2
    // }
    let imgDisplay3;
    // if (indSpot.url3 === null) {
    //     imgDisplay3 = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    // } else {
    //     imgDisplay3 = indSpot.url3
    // }
    let imgDisplay4;
    // if (indSpot.url4 === null) {
    //     imgDisplay4 = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    // } else {
    //     imgDisplay4 = indSpot.url4
    // }
    let imgDisplay5;
    // if (indSpot.url5 === null) {
    //     imgDisplay5 = "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
    // } else {
    //     imgDisplay5 = indSpot.url5
    // }


    return (
        <div className="Indv-spot-div">
        {indSpot &&
        <div>
            <h4 className="span-title">{indSpot.name}</h4>
            <span className="span-address-single">{indSpot.address} {indSpot.city}, {indSpot.state}, {indSpot.country}</span>
            <div className="image-block">
                {<div className="single-url1">
                    {indSpot.url1 === null && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url1 !== null && (<img className="img-url1" alt="airbnb-image" src={indSpot.url1}></img>)}
                </div>
                }
               {<div className="single-url2">
                    {indSpot.url2 === null && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url2 !== null && (<img className="img-url1" alt="airbnb-image" src={indSpot.url2}></img>)}
                </div>
                }
                {<div className="single-url3">
                    {indSpot.url3 === null && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url3 !== null && (<img className="img-url1" alt="airbnb-image" src={indSpot.url3}></img>)}
                </div>
                }
               {<div className="single-url4">
                    {indSpot.url4 === null && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url4 !== null && (<img className="img-url1" alt="airbnb-image" src={indSpot.url4}></img>)}
                </div>
                }
               {<div className="single-url5">
                    {indSpot.url5 === null && (<img className="img-url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)}
                    {indSpot.url5 !== null && (<img className="img-url1" alt="airbnb-image" src={indSpot.url5}></img>)}
                </div>
                }
            </div>
            <br></br>
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
