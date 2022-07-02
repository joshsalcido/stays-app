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

export const thunkCreateSpot = (newSpot) => async (dispatch) => {
  const userId = newSpot.userId

    const response = await csrfFetch(`/api/spots/${userId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newSpot)
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(actionCreateSpot(data))
      return data
    }
}

export const thunkUpdateSpot = (spot) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
  })
  if (response.ok) {
    const data = await response.json();

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

        return createState;

    case GET_SPOTS:
      action.spots.forEach(spot => {

        newState[spot.id] = spot
      });
      return newState;

    case UPDATE_SPOT:
      const updateState = {...state}
      updateState[action.spot.id] = action.spot

      return updateState;

    case DELETE_SPOT:
      const deleteState = {...state}

      deleteState[action.spotId] = action.spot

      delete deleteState[action.spotId]
      return deleteState;

    default:
      return state;
  }
};

export default userSpots
