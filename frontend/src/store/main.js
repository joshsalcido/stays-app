import { csrfFetch } from "./csrf";

// actionTypes

const GET_ALL_SPOTS = 'main/getAllSpots'

// Action Creators

const actionGetAllSpots = (allSpots) => {
    return {
        type: GET_ALL_SPOTS,
        allSpots
    }
}

// THUNKS

export const thunkGetAllSpots = () => async (dispatch) => {

    const response = await csrfFetch(`/api/main/`);
    if (response.ok) {
        const allSpots = await response.json();
        dispatch(actionGetAllSpots(allSpots));
    }
  };

  // REDUCERS

const allSpots = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      const newState = {};
      action.allSpots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState;
    default:
      return state;
  }
};

export default allSpots;
