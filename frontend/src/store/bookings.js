import { csrfFetch } from "./csrf";

// ACTION TYPES

const GET_ALL_BOOKINGS = 'bookings/getAllBookings';
const CREATE_BOOKING = 'bookings/createBooking';
// const DELETE_BOOKING = 'bookingd/deleteBooking';
// const UPDATE_BOOKING = 'booking/updateBooking';


//  ACTIONS
export const actionGetAllBookings = (userId) => {
    return {
        type: GET_ALL_BOOKINGS,
        userId
    }
}
export const actionCreateBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}
// export const actionDeleteBooking = (booking) => {
//     return {
//         type: DELETE_BOOKING,
//         booking
//     }
// }

// export const actionUpdateBooking = (booking) => {
//     return {
//         type: UPDATE_BOOKING,
//         booking
//     }
// }


// THUNKS

export const thunkGetAllBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllBookings(data));
        return data;
    }
}

export const thunkCreateBooking = (booking) => async (dispatch) => {


    const response = await csrfFetch(`/api/bookings/newbooking`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(booking)
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(actionCreateBooking(data))
      return data
    }
}
// export const thunkDeletePost = (postId) => async (dispatch) => {
//     const response = await fetch(`/api/posts/${postId}`, {
//         method: "DELETE",
//     })

//     if (response.ok) {
//         const deletedPost = await response.json();
//         dispatch(actionDeletePost(postId))
//         return deletedPost;
//     }
// }

// export const thunkUpdatePost = (post) => async (dispatch) => {
//     const response = await fetch(`/api/posts/${post.id}`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(post),
//     })

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(actionUpdatePost(data))
//         return data;
//     }
// }



const bookingReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_BOOKINGS:
            // newState = {};
            console.log(action, "GET BOOKINGS ACTION")
            action.userId.forEach(booking => {
                newState[`Booking ${booking.id}`] = booking
            });
            return newState;
        case CREATE_BOOKING:
            newState[action.bookings.id] = action.bookings
            return newState
        // case DELETE_BOOKING:
        //     delete newState[action.postId]
        //     return newState
        // case UPDATE_BOOKING:
        //     newState[action.post.id] = action.post
        //     return newState
        default:
            return state;
    }
}

export default bookingReducer
