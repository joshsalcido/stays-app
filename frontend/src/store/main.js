import { csrfFetch } from "./csrf";

// actionTypes

const GET_ALL_SPOTS = 'main/getAllSpots'

// Action Creators

const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// THUNKS

export const thunkGetAllSpots = (spots) => async (dispatch) => {
  // console.log(userId, "GET userId ********")
    const response = await csrfFetch(`/api/main/`);
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllSpots(data));
        return response;
    }
  };

  // REDUCERS

const allSpots = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_ALL_SPOTS:
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState;
    default:
      return state;
  }
};

export default allSpots;
