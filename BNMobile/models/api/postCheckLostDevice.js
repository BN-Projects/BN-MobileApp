import getConnectionLink from '../Connector'
import axios from 'axios';
var device="";
export default async function postCheckLostDevice(paramsValues){
    var directory="checklostdevice";
    var paramsNames=["uuid"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    console.log(obj)
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log(res.data)
          device=res.data;
     })
     .catch(error => {
       console.log(error);
     });
    return device;
 }