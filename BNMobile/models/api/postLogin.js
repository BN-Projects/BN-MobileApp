import getConnectionLink from '../Connector'
import axios from 'axios';
var login="";
export default async function postLogin(paramsValues){
    var directory="login";
    paramsValues.push("mobil")
    var paramsNames=["email","password","pushId","loginType"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log(res.data)
         login=res.data.user_token;
     })
     .catch(error => {
       console.log(error);
     });
    return login;
 }