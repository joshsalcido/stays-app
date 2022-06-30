
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";
import { thunkGetAllSpots } from "../store/main";
import { Link } from "react-router-dom";
import CreateReview from "./createReview";

export default function MainPage(){
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session?.user?.id)
    // const currState = useSelector(state => state);
    const allSpots = useSelector(state => state?.allSpots)
    // console.log(currState, "<+++ CURRSTATE")
    // console.log(allSpots, "<--MAIN ALLSPOTs")
    const [spots, setSpots] = useState([]);

    const [showReviewForm, setShowReviewForm] = useState(false)

    // async function onSelect(spotId) {

    // }

    useEffect(()=>{
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    useEffect(()=> {
        if (allSpots){
            setSpots(Object.values(allSpots))
        }
    }, [allSpots])
    // if (allSpots){
    //     setSpots(Object.values(allSpots))
    // }


    return (
        <div>{spots.map((spot)=> (
            <div key={spot.id}>
                <Link style={{textDecoration: 'none', color: 'black'}}>
                 <h4 className="span-name">{spot.name}</h4>
                       <span className="span-address">Address: {spot.address}</span>
                       <br/>
                       <span className="span-city">City: {spot.city}</span>
                       <br/>
                       <span className="span-state">State: {spot.state}, {spot.country}</span>
                       <h4 className="span-price">Price: ${spot.price}/ Night</h4>
                       {userId && <button onClick={setShowReviewForm(true)}>Leave a Review!</button>}
                       {showReviewForm && <div><CreateReview/></div>}
                       <br></br>
                </Link>
            </div>
        ))}</div>
    )
};
