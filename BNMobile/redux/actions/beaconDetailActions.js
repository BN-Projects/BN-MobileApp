import * as actionTypes from "./actionTypes"
import getBeaconDetailData from '../../models/api/getBeaconDetailData';
export function beaconDetailList(beacon)
{
    return {
        type:actionTypes.BEACONDETAIL,
        payload:beacon
    }
}
export function getBeaconDetail(paramsValues)
{
    return function(dispatch){
        getBeaconDetailData(paramsValues)
        .then((result)=>{
            dispatch(beaconDetailList(result))
        })
    }
}