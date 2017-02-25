/**
 * Created by xax on 23.02.2017.
 */
import {AUTH_USER,UNAUTH_USER} from '../actions/types';

export default function (state = {authenticated: false,error: ''},action) {
    switch (action.type) {
        case AUTH_USER:
            console.log(action,state);
            return action.payload.code ?
                {...state,error: action.payload.message, authenticated: false}:
                ({...state, error: '', authenticated: action.payload});
        case  UNAUTH_USER:
            return {...state, authenticated: false};
    }
    return state;
}