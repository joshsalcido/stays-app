
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";

import { thunkGetAllSpots } from "../store/main";
import { Link , NavLink} from "react-router-dom";


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
        <div>{Object.values(allSpots).map((spot)=> (
            <div key={spot.id}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/spot/${spot.id}`} >
                 <h4 className="span-name">{spot.name}</h4>
                       <span className="span-address">{spot.address}</span>
                       <br/>
                       <span className="span-city">{spot.city},</span>
                       <br/>
                       <span className="span-state">{spot.state}, {spot.country}</span>
                       <h4 className="span-price">Price: ${parseInt(spot.price).toLocaleString("en-Us")}/ Night</h4>
                       <br></br>
                </NavLink>
            </div>
        ))}</div>
        </>
    )
};
