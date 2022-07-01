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
const actionGetReviews = (reviews, spotId) => {
    return {
        type: GET_REVIEWS,
        reviews,
        spotId
    }
}
// const actionUpdateReview = (review) => {
//     return {
//         type: UPDATE_REVIEW,
//         review
//     }
// }
const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId

    }
}

// THUNKS

export const thunkGetReviews = (spotId) => async (dispatch) => {
  // console.log(reviews, "THUNK GET reviews ********")
    const response = await csrfFetch(`/api/reviews/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetReviews(data));
        return data;
    }
  };

export const thunkCreateReview = (newReview) => async (dispatch) => {
  const spotId = newReview.spotId
  console.log(spotId, "<--- CREATE THUNK")
    const response = await csrfFetch(`/api/reviews/${spotId}`, {
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

// export const thunkUpdateReview = (spot) => async (dispatch) => {
//   // console.log(spot, "<-----thunk UPDATE SPOT")
//   const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
//       method: 'PUT',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(spot)
//   })
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(actionUpdateReview(data))
//     return data
//   }
// }

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  // console.log(spotId, "<--- THUNK DELETE")
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const {id} = await response.json();
    dispatch(actionDeleteReview(id))
    return id;
  }
}

  // REDUCERS

const reviewReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_REVIEWS:
      newState = {}
      console.log(action, "Get ACTION")
      action.reviews.forEach(review => {
          // console.log(spot, "$$***REDUCERRRRRRRRR**$$")
        newState[review.id] = review
      });
      return newState;

    case CREATE_REVIEW:

        // console.log(action, "action Review")
        // newState[action.review.id] = action.review
    //   newState.user = action.payload;
    //   return newState;
        return {...state, [action.review.id]: action.review};


    case DELETE_REVIEW:
      // console.log(action, "DELETE ACTION")
      const deleteState = {...state}
      // deleteState[action.reviewId] = action.review
      // console.log(action, "<+++++ DELETE SPOT"
      delete deleteState[action.reviewId]
      return deleteState;

    default:
      return state;
  }
};

export default reviewReducer;
