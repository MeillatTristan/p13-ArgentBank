import {LOGIN_USER, USERS_ERROR} from '../types'

const initialState = {
    loading:true,
    token:false,
}


export default function loggedReducer(state = initialState, action){

    switch(action.type){

        case USERS_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }
        case LOGIN_USER:
            return{
                ...state, 
                token: action.payload.token,
                createdAt: action.payload.createdAt,
                email: action.payload.email,
                firstName: action.payload.firstName,
                id: action.payload.id,
                lastName: action.payload.lastName,
                updatedAt: action.payload.updatedAt,
                loading: false
            }
        default: return state
    }

}