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
  // console.log(userId, "GET userId ********")
    const response = await csrfFetch(`/api/spots/user/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSpots(data));
        return response;
    }
  };

export const thunkCreateSpot = (newSpot) => async (dispatch) => {
  const userId = newSpot.userId
  // console.log(userId, "<--- CREATE THUNK")
    const response = await csrfFetch(`/api/spots/${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newSpot)
    })
    // console.log("<--- INSIDE THUNK")
    if (response.ok) {
      const data = await response.json();
      dispatch(actionCreateSpot(data))
      return data
    }
}

export const thunkUpdateSpot = (spot) => async (dispatch) => {
  console.log(spot, "<-----thunk UPDATE SPOT")
  const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
  })
  if (response.ok) {
    const data = await response.json();
    console.log(data, "%%%%% UPDATE THUNK DATA")
    dispatch(actionUpdateSpot(data))
    return data
  }
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  // console.log(spotId, "<--- THUNK DELETE")
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteSpot(spotId))
  }
}

  // REDUCERS

const userSpots = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {

    case CREATE_SPOT:
        const createState = {...state}
        createState[action.spot.id] = action.spot
    //   newState.user = action.payload;
    //   return newState;
        return createState;

    case GET_SPOTS:
      action.spots.forEach(spot => {
          // console.log(spot, "$$***REDUCERRRRRRRRR**$$")
        newState[spot.id] = spot
      });
      return newState;

    case UPDATE_SPOT:
      const updateState = {...state}
      updateState[action.spot.id] = action.spot
      console.log(action, "++++ UPDATE STATE")
      return updateState;

    case DELETE_SPOT:
      const deleteState = {...state}
      // console.log(action, "<--- DELETE_SPOT")
      deleteState[action.spotId] = action.spot
      // console.log(action, "<+++++ DELETE SPOT")
      delete deleteState[action.spotId]
      return deleteState;

    default:
      return state;
  }
};

export default userSpots
