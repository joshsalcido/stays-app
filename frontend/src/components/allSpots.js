
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { thunkGetUserSpots, thunkCreateSpot, thunkDeleteSpot } from "../store/spots";
import EditSpotForm from "./EditSpotForm";
import { thunkGetAllSpots } from "../store/main";

export default function MainPage(){
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state)

    const [spots, setSpots] = useState([]);

    async function onSelect(spotId) {

    }

    useEffect(()=>{
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    useEffect(()=> {
        if (allSpots){
            setSpots(Object.values(allSpots))
        }
    }, [allSpots])

    return (
        <div>{allSpots && spots.map((spot)=> (
            <div key={spot.id}>{spot.name}</div>
        ))}</div>

    )
};
