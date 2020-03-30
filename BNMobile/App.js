import React, { Component } from 'react';
import { ApplicationProvider, IconRegistry,Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {DrawerMenu} from './DrawerMenu';
import Notification from './components/notificationComponent/Notification';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import MapView from 'react-native-maps';
import IndoorMap from './IndoorMap';
<<<<<<< HEAD
import { TouchableOpacity} from 'react-native';
import MissingDeclaration from './components/missingDeclarationComponent/MissingDeclaration';
import DeviceEdit from './components/deviceEditComponent/DeviceEdit';
import AddCreditCard from './components/addCreditCardComponent/AddCreditCard';
import FindDevice from './modals/findDeviceModal/FindDevice';
import Scanner from './modals/scannerModal/Sccanner';
import Success from './modals/successModal/Success';
import Error from './components/errorComponent/Error';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as pageActions from "./redux/actions/pageActions";
import About from './components/aboutComponent/About'
import ProfileAccount from './components/profileAccountComponent/ProfileAccount';
import Device from './components/deviceComponent/Device';
import SıgnIn from './components/signInComponent/SignIn';
import DeviceDetail from './components/deviceDetailComponent/DeviceDetail';
class App extends Component{
  render()
  {
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <DrawerMenu renderPage={pageChange("Giriş Yap")}></DrawerMenu>
      </ApplicationProvider>
    )
  }
}
=======

import {
  TouchableOpacity,
} from 'react-native';
const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <IconRegistry icons={EvaIconsPack} />
    <DrawerMenu renderPage={pageChange("Kartlar")}></DrawerMenu>
  </ApplicationProvider>
);
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
const MapPage = ()=>(
  <Layout style={{flex:1,backgroundColor:'#cccccc'}}>
    <IndoorMap></IndoorMap>
  </Layout>
);
const pageChange=(pageName)=>{
  console.log(pageName)
  if(pageName=="Anasayfa"){
    return <AddCreditCard></AddCreditCard>
  }
<<<<<<< HEAD
  else if(pageName=="Bildirimlerim"){
=======
  else if(pageName=="Kartlar"){
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
    return <Notification></Notification>
  }
  else if(pageName=="Haritalar"){
    return <IndoorMap></IndoorMap>
  }
<<<<<<< HEAD
  else if(pageName=="Kayıp İlanı"){
    return <MissingDeclaration></MissingDeclaration>
  }
  else if(pageName=="Düzenle"){
    return <DeviceEdit></DeviceEdit>
  }
  else if(pageName=="Detay"){
    return <DeviceDetail></DeviceDetail>
  }
  else if(pageName=="Kartlar"){
    return <AddCreditCard></AddCreditCard>
  }
  else if(pageName=="Cihaz Tarama"){
    return <FindDevice></FindDevice>
  }
  else if(pageName=="TarayıcıModal"){
    return <Scanner></Scanner>
  }
  else if(pageName=="BaşarılıModal"){
    return <Success></Success>
  }
  else if(pageName=="Hakkımızda"){
    return <About></About>
  }
  else if(pageName=="Profil"){
    return <ProfileAccount></ProfileAccount>
  }
  else if(pageName=="Cihazlarım"){
    return <Device></Device>
  }
  else if(pageName=="Giriş Yap"){
    return <SıgnIn></SıgnIn>
  }
  else{
    return <Error></Error>
  }
}
function mapStateToProps(state) {
  return {
    currentPage: state.changePageReducer
  };
=======

>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
}
export default connect(mapStateToProps)(App);