import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function postLostBeacon(paramsValues){
    var directory="addlostdevice";
    var paramsNames=["phone","email","creditCardNo","creditCardFullName","creditCardExDate","cvv","lastSeen","lostLat","lostLong","beaconID"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log("aha bu res"+res)
          beacon=res.data;
          debugger;
     })
     .catch(error => {
       console.log(error);
     });
    return beacon;
 }