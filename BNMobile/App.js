﻿import React, { Component } from 'react';
import { ApplicationProvider, IconRegistry,Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {DrawerMenu} from './components/drawerMenuComponent/DrawerMenu';
import Notification from './components/notificationComponent/Notification';
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
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';
import * as LoginActions from "./redux/actions/loginActions";
import Map from './components/mapComponent/map';
import ChangePass from './components/changePassComponent/ChangePass';
import BeaconMonitoringAndRanging from './beaconMonitoringAndRanging';
class App extends Component{
  componentDidMount(){
    this.props.actions.login("")
    console.log("token "+this.props.token)
    if(this.props.token=="")
    {
      Actions.Login();
    }
    else{
      Actions.drawerMenu();
      Actions.Device();
    }
    // Actions.drawerMenu();
    // Actions.Map();
  }
  render()
  {
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <BeaconMonitoringAndRanging></BeaconMonitoringAndRanging>
        <Router>
          <Modal>
            <Scene key="root" hideNavBar>
              <Scene initial key="Login" component={SıgnIn} />
            </Scene>
            <Scene 
              overlay
              hideNavBar
              key="drawerMenu"
              contentComponent={DrawerMenu}
            >
              <Scene key="mainNav" hideNavBar={true}>
                <Scene key="About" component={About}/>
                <Scene key="Device" component={Device}/>
                <Scene key="Notification" component={Notification}/>
                <Scene key="DeviceDetail" path={"/detail/device/:id/"} component={DeviceDetail}/>
                <Scene key="DeviceEdit" path={"/edit/device/:device/"} component={DeviceEdit}/>
                <Scene key="ProfileAccount" component={ProfileAccount}/>
                <Scene key="MissingDeclaration" component={MissingDeclaration}/>
                <Scene key="FindDevice" component={FindDevice}/>
                <Scene key="Map" component={Map}/>
                <Scene key="Card" component={AddCreditCard}/>
                <Scene key="Error" component={Error}/>
                <Scene key="ChangePass" component={ChangePass}/>
                {/* üste dinamik path gelecek */}
              </Scene>
            </Scene>
          </Modal>
        </Router>
      </ApplicationProvider>
    )
  }
}
function mapStateToProps(state) {
  return {
    token: state.loginReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(LoginActions.login, dispatch),
    }
  };
}//actions alındı
export default connect(mapStateToProps,mapDispatchToProps)(App);