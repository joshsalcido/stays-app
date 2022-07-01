
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../../store/spots";
import EditSpotForm from "../EditSpotForm";
import { thunkGetIndividualSpot } from "../../store/spot";
import { thunkGetAllSpots } from "../../store/main";
import { thunkDeleteReview, thunkGetReviews } from "../../store/reviews";
import { Link, useParams } from "react-router-dom";
import CreateReview from "../createReview";
import './individualSpot.css'

export default function IndividualSpot(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const idNum = parseInt(id);
    console.log(idNum, "USEPARAMS")

    const currState = useSelector(state => state);
    const indSpot = useSelector(state => state.allSpots[idNum])
    const userId = useSelector(state => state.session.user?.id)
    // const user = useSelector(state => state.session.user)
    // const [showForm, setShowForm] = useState(true);
    console.log(currState, "<+++ CURRSTATE")
    console.log(indSpot, "<-- INDSPOTTTTTTTT")
    const reviews = useSelector(state => state.allSpots[idNum].Reviews)
    //  const [allSpot, setAllSpot] = useState([]);
    // let currSpot;
    // spotData.forEach(spot => {
    //     console.log(spot.id, "spot")
    //     if (spotId === spot.id){
    //         currSpot = spot;
    //     }
    // })
    const [reviewForm, setReviewForm] = useState(false)
    async function revealReviewForm(e) {
        e.preventDefault()
        setReviewForm(!reviewForm)
    }

    async function onDelete(reviewId){
        dispatch(thunkDeleteReview(reviewId, idNum))
        dispatch(thunkGetReviews(idNum))
    }
    // console.log(currSpot, " Current Spot")
    // const [showReviewForm, setShowReviewForm] = useState(false)
    useEffect(()=>{
        // dispatch(thunkGetAllSpots())
        dispatch(thunkGetReviews(idNum))
    }, [dispatch, idNum])
    // useEffect(()=> {
    // setAllSpot(Object.values(allSpots))
    // },[]);
    // if (allSpots){
    //     setSpots(Object.values(allSpots))
    // }
    // console.log(allSpots)
    let reviewButton = "Leave a Review!"
    if (reviewForm){
        reviewButton = "Cancel Review"
    }
    return (
        <div>
        {indSpot &&
        <div>
            <h4 className="span-title">{indSpot.name}</h4>
            <span className="span-address">Address: {indSpot.address}</span>
            <br/>
            <span className="span-city">City: {indSpot.city}</span>
            <br/>
            <span className="span-state">State: {indSpot.state}, {indSpot.country}</span>
            <h4 className="span-price">Price: ${indSpot.price}/ Night</h4>
        </div>
        }
            {userId && <button onClick={revealReviewForm}>{reviewButton}</button>}
            {reviewForm && <div><CreateReview spotId={id}/></div>}
            <div>
                {reviews && (
                    <h4>Reviews:</h4>
                )}
                { reviews && reviews.map((review) => (
                    <div key={review.id}>
                    {(
                        <div className="reviewBox">
                           {/* <h5>{user.username}</h5> */}
                           {/* {userId && review.userId === userId && */}
                           <h5>Rating:{review.rating}</h5>
                           <span>{review.review}</span>
                           {(
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
