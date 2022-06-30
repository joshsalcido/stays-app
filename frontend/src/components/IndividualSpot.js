
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";
import { thunkGetIndividualSpot } from "../store/spot";
import { thunkGetAllSpots } from "../store/main";
import { Link, useParams } from "react-router-dom";
import CreateReview from "./createReview";

export default function IndividualSpot(){
    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(id, "USEPARAMS")

    // const currState = useSelector(state => state);
    const indSpot = useSelector(state => state.allSpots[id])
    // console.log(currState, "<+++ CURRSTATE")
     console.log(indSpot, "<-- IND SPOT")
    //  const [allSpot, setAllSpot] = useState([]);
    // let currSpot;
    // spotData.forEach(spot => {
    //     console.log(spot.id, "spot")
    //     if (spotId === spot.id){
    //         currSpot = spot;
    //     }
    // })
    // console.log(currSpot, " Current Spot")
    const [showReviewForm, setShowReviewForm] = useState(false)
    useEffect(()=>{
        dispatch(thunkGetAllSpots(id))
    }, [dispatch])
    // useEffect(()=> {
    // setAllSpot(Object.values(allSpots))
    // },[]);
    // if (allSpots){
    //     setSpots(Object.values(allSpots))
    // }
    // console.log(allSpots)
    return (
        <>
         <span className="span-address">Address: {indSpot.address}</span>
                       <br/>
                       <span className="span-city">City: {indSpot.city}</span>
                       <br/>
                       <span className="span-state">State: {indSpot.state}, {indSpot.country}</span>
                       <h4 className="span-price">Price: ${indSpot.price}/ Night</h4>
        </>
    )
};
