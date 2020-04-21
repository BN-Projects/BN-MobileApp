import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function postLostBeacon(paramsValues){
    var directory="addlostdevice";
    var paramsNames=["phone","email","creditCardNo","creditCardFullName","creditCardExDate","cvv","lastSeen","lostLat","lostLong","beaconID","lostDesc"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    console.log(obj)
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log("aha bu res"+res.data)
          beacon=res.data;
     })
     .catch(error => {
       console.log(error);
     });
    return beacon;
 }