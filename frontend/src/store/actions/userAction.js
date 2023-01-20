import {LOGIN_USER} from '../types'

// export const getUsers = () => async dispatch => {
    
//     try{
//         const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
//         dispatch( {
//             type: GET_USERS,
//             payload: res.data
//         })
//     }
//     catch(error){
//         dispatch( {
//             type: USERS_ERROR,
//             payload: error,
//         })
//     }

// }

export const loginUser = (data) => async dispatch => {  
    dispatch({
        type: LOGIN_USER,
        payload: data
    })
    // catch(error){
    //     dispatch( {
    //         type: USERS_ERROR,
    //         payload: error.message,
    //     })
    // }


}