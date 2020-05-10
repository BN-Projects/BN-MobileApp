import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function getBeaconDetailData(paramsValues){
    var directory="devicedetail";
    var paramsNames=["deviceId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    await axios.get(obj)
    .then((res) => {
      if(!res.data.error){
        beacon = res.data;
      }  
      else{
        alert(res.data.message);
      }
     })
     .catch(error => {
     });
    return beacon;
 }