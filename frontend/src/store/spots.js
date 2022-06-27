import { csrfFetch } from "./csrf";

// Action Types
const CREATE_SPOT = 'spots/createSpot'

const GET_SPOT = 'spots/getSpot'

const UPDATE_SPOT = 'spots/updateSpot'

const DELETE_SPOT = 'spots/deleteSpot'

// Action Creators

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}
const actionGetSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}
const actionUpdateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}
const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

// THUNKS

export const thunkGetAllSpots = (spots) => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
