import getConnectionLink from '../Connector'
import axios from 'axios';
var lostBeacons=[];
export default async function getLostBeaconList(paramsValues){
    var directory="lostdevices";
    var paramsNames=["userId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
      if(!res.data.error){
        lostBeacons = JSON.parse(JSON.stringify(res.data.beacons));
      }  
      else{
        alert(res.data.message);
      }
     })
     .catch(error => {
     });
    return lostBeacons;
 }