import { csrfFetch } from "./csrf";

// Action Types
const CREATE_REVIEW = 'reviews/createReview'

const GET_REVIEWS = 'reviews/getReviews'

const UPDATE_REVIEW = 'reviews/updateReview'

const DELETE_REVIEW = 'reviews/deleteReview'

// Action Creators

const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}
const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}
const actionUpdateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}
const actionDeleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

// THUNKS

export const thunkGetReviews = (reviews) => async (dispatch) => {
  // console.log(userId, "GET userId ********")
    const response = await csrfFetch(`/api/spots/`);
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetReviews(data));
        return response;
    }
  };

export const thunkCreateReview = (newReview) => async (dispatch) => {
  const spotId = newReview.spotId
  // console.log(userId, "<--- CREATE THUNK")
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newReview)
    })
    // console.log("<--- INSIDE THUNK")
    if (response.ok) {
      const data = await response.json();
      dispatch(actionCreateReview(data))
      return data
    }
}

export const thunkUpdateReview = (spot) => async (dispatch) => {
  // console.log(spot, "<-----thunk UPDATE SPOT")
  const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(actionUpdateReview(data))
    return data
  }
}

export const thunkDeleteReview = (spotId) => async (dispatch) => {
  // console.log(spotId, "<--- THUNK DELETE")
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteReview(spotId))
  }
}

  // REDUCERS

const reviewReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {

    case CREATE_REVIEW:
        const createState = {...state}
        createState[action.spot.id] = action.spot
    //   newState.user = action.payload;
    //   return newState;
        return createState;

    case GET_REVIEWS:
      action.spots.forEach(spot => {
          // console.log(spot, "$$***REDUCERRRRRRRRR**$$")
        newState[spot.id] = spot
      });
      return newState;

    case UPDATE_REVIEW:
      const updateState = {...state}
      updateState[action.spot.id] = action.spot
      return updateState;

    case DELETE_REVIEW:
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

export default reviewReducer;
