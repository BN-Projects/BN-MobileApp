import * as actionTypes from "./actionTypes"
import postLogin from '../../models/Connector';
export function login(login)
{
    return {
        type:actionTypes.LOGIN,
        payload:login
    }
}
export function getToken(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        postLogin(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(login(result))
            
        })
    }
}