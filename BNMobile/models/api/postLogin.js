import getConnectionLink from '../Connector'
import axios from 'axios';
var login="";
export default async function postLogin(paramsValues){
    var directory="login";
    var paramsNames=["email","password"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log("aha bu"+res)
         login=res.data.user_token;
     })
     .catch(error => {
       console.log(error);
     });
    return login;
 }