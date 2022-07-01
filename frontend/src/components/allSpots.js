
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";
import { thunkGetAllSpots } from "../store/main";
import { Link , NavLink} from "react-router-dom";
import CreateReview from "./createReview";

export default function MainPage(){
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session?.user?.id)
    // const currState = useSelector(state => state);
    const allSpots = useSelector(state => state.allSpots)
    // console.log(currState, "<+++ CURRSTATE")
    // console.log(allSpots, "<--MAIN ALLSPOTs")
    //  const [allSpot, setAllSpot] = useState([]);

    const [showReviewForm, setShowReviewForm] = useState(false)

    // async function onSelect(spotId) {

    // }

    useEffect(()=>{
        dispatch(thunkGetAllSpots())
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
        <div>{Object.values(allSpots).map((spot)=> (
            <div key={spot.id}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/spot/${spot.id}`} >
                 <h4 className="span-name">{spot.name}</h4>
                       <span className="span-address">Address: {spot.address}</span>
                       <br/>
                       <span className="span-city">City: {spot.city}</span>
                       <br/>
                       <span className="span-state">State: {spot.state}, {spot.country}</span>
                       <h4 className="span-price">Price: ${spot.price}/ Night</h4>
                       <br></br>
                </NavLink>
            </div>
        ))}</div>
        </>
    )
};
