import { csrfFetch } from "./csrf";


const GET_INDIVIDUAL_SPOT = 'spot/getSpot'

const actionGetIndividualSpot = (spotId) => {
    return {
      type: GET_INDIVIDUAL_SPOT,
      spotId
    }
  }


  export const thunkGetIndividualSpot = (spotId) => async (dispatch) => {
    console.log(spotId, "SPOT ID")
      const response = await csrfFetch(`/api/spot/${spotId}`);
      if (response.ok){
        const data = await response.json();
        dispatch(actionGetIndividualSpot(data))
      }
  }

const singleSpot = (state = {}, action) => {
    // let newState = {...state};
    switch (action.type) {
        case GET_INDIVIDUAL_SPOT:
            const indvState = state
            console.log(action, "+++INDV ACTION")

              indvState[action.spotId.id] = action.spotId;

            return indvState;
        default:
            return state;
    }
}

export default singleSpot
