import getConnectionLink from '../Connector'
import axios from 'axios';
var notification="";
export default async function postNotification(paramsValues){
    var directory="mynotifications";
    var paramsNames=["userId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    console.log(obj)
    await axios.post(obj.url,obj.data)
    .then((res) => {
        console.log(res.data)
        notification=res.data;
     })
     .catch(error => {
        console.log(error)
     });
    return notification;
 }