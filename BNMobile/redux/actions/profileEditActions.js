import * as actionTypes from "./actionTypes"
import putProfile from '../../models/api/putProfile';
export function profileEdit(profile)
{
    console.log(profile.error)
    return {
        type:actionTypes.PROFILEEDIT,
        payload:profile
    }
}
export function putProfileEdit(paramsValues)
{
    return function(dispatch){
        putProfile(paramsValues)
        .then((result)=>{
            dispatch(profileEdit(result))
        })
    }
}