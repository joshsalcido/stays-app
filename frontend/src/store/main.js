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

export const thunkGetAllSpots = (allSpots) => async (dispatch) => {
  //  console.log(allSpots, "spots ********")
    const response = await csrfFetch(`/api/main`);
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
      // console.log(action, "&&&&&&&&")
      action.allSpots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState;
    default:
      return state;
  }
};

export default allSpots;
