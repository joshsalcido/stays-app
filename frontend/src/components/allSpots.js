
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";

import { thunkGetAllSpots } from "../store/main";
import { Link , NavLink} from "react-router-dom";

import './allspots.css'


export default function MainPage(){
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session?.user?.id)

    const allSpots = useSelector(state => state.allSpots)


    // const [showReviewForm, setShowReviewForm] = useState(false)



    useEffect(()=>{
        dispatch(thunkGetAllSpots())
    }, [dispatch])



    return (
        <>
        <div className="allSpotsDiv">{Object.values(allSpots).map((spot)=> (
            <div className="singleSpotDiv" key={spot.id}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/spot/${spot.id}`}>

                        {/* (<img className="url1" alt="airbnb-image" src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"></img>)} */}
                       <img className="url1" alt="airbnb-Image"  src={spot.url1 === '' ? "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" : spot.url1}></img>
                       <h5 className="span-city">{spot.city}, {spot.state}</h5>
                       <span className="span-address">{spot.address}</span>
                       <br/>
                       <span className="span-address">{spot.state}, {spot.country}</span>
                       <h5 className="h5-price">${parseInt(spot.price).toLocaleString("en-Us")} / night</h5>
                       <br></br>
                </NavLink>
            </div>
        ))}</div>
        </>
    )
};
