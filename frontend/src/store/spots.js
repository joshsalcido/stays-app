import { csrfFetch } from "./csrf";

// Action Types
const CREATE_SPOT = 'spots/createSpot'

const GET_SPOTS = 'spots/getSpots'

const UPDATE_SPOT = 'spots/updateSpot'

const DELETE_SPOT = 'spots/deleteSpot'

// Action Creators

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}
const actionGetSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
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

export const thunkGetUserSpots = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/user/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSpots(data));
        return response;
    }
  };

  // REDUCERS

const userSpots = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {

    case CREATE_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.user = action.payload;
    //   return newState;
        break

    case GET_SPOTS:
      action.spots.forEach(spot => {
          console.log(spot, "$$***REDUCERRRRRRRRR**$$")
        newState[spot.id] = spot
      });
      return newState;

    case UPDATE_SPOT:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    case DELETE_SPOT:

      delete newState[action.spotId]
      return newState;

    default:
      return state;
  }
};

export default userSpots
