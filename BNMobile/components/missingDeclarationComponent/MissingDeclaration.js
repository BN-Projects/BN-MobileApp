import Styles from './Styles';
import React, {Component} from 'react';
import {Select, Layout, Input, Button, CheckBox, Text, Spinner, Icon} from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import * as LostBeaconActions from "../../redux/actions/lostBeaconActions";
import { Actions } from 'react-native-router-flux';

import { CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';



const CloseOutlineIcon = style => <Icon {...style} name='close-outline' fill="#55AFFB"/>
class MissingDeclaration extends Component {
  constructor(props)
  {
    super(props)
    this.state ={
      selectedOption: null,
      selectedIndex:null,
      checkedInformations:false,
      checkedAutoFind:false,
      coordinate:{},
      spinner:false,
      data:[],
      email: '',
      phone: '',
      creditCard:{}
    }
  }
  _onChange(form)
  {
    console.log(form)
    this.setState({
      creditCard:form
    })
  }
  isValid ={
    emailIsValid: false,
    phoneIsValid: false,
  }
  componentDidMount()
  {
    console.log(" BAK BAK BAK"+this.props.coordinate)
    let data=[];
    this.setState({
      coordinate : this.props.coordinate,
    });
    this.props.beacons.map((beacon, index) => {
      let obj = {
        id:beacon.beacon_id,
        text:beacon.beacon_name
      }
      data.push(obj)
    });
    this.setState({
      data:data
    })
  }
  componentDidUpdate()
  {
    if(this.state.data!=[] && this.state.spinner==false)
    {
      console.log(this.state.data)
      this.setState({
        spinner:true
      })
    }
  }
  onCheckedInformations = () => {
    this.setState({
        checkedInformations:!this.state.checkedInformations,
        email:'',
        phone:''
    })
  };
  onAutoFind = () => {
    this.setState({
        checkedAutoFind:!this.state.checkedAutoFind
    })
  };
  chooseDevice = (item) => {
    console.log(item.text)
    this.setState({
      selectedOption: item.id,
      selectedIndex: item.text
    })
  }
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
  regEmail = (email) => {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(re.test(email))
    {
      this.isValid.emailIsValid=true
      return true
    }
    else{
      this.isValid.emailIsValid=false
      return false
    }
  }
  //regPhone'a bak
  regPhone = (phone) => {
    //buraya bakılacak
    var re = "";
    if(true)
    {
      this.isValid.phoneIsValid=true
      return true
    }
    else{
      this.isValid.phoneIsValid=false
      return false
    }
  }
  isFormValid = () => {
    for (const item in this.isValid) {
      if(this.isValid[item]==false)
      {
        return false
      }
    }
    return true;
  }
  renderTextbox = () =>(
    <View>
      <Input
            style={this.regPhone(this.state.phone) ? Styles.input : Styles.emptyInput}
            value={this.state.phone}
            label="Telefon numarası"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ phone:item})}
            onIconPress={() => this.setState({ phone: '' })}
            captionStyle={Styles.red}
            caption={this.regPhone(this.state.phone) ? '' : 'Can not be empty'}
            keyboardType={'numeric'}
            disabled={this.state.checkedInformations ? false : true}
          />
     <Input
           style={this.regEmail(this.state.email) ? Styles.input : Styles.emptyInput}
           value={this.state.email}
           label="Email"
           labelStyle={Styles.customizeLabelStyle}
           textStyle={Styles.customizeTextStyle}
           icon={CloseOutlineIcon}
           onChangeText={item => this.setState({ email:item})}
           onIconPress={() => this.setState({ email: '' })}
           captionStyle={Styles.red}
           caption={this.regEmail(this.state.email) == true ? '' : 'Can not be empty'}
           disabled={this.state.checkedInformations ? false : true}
          />
    </View>
  )
  scanCard = async () => {
    try {
      const card = await CardIOModule.scanCard();
      alert(JSON.stringify(card));
    } catch (err) {
      console.log(err);
    }
  };
  creditCard = () => (
    <KeyboardAwareScrollView>
    <Layout style={Styles.container}>
      <TouchableOpacity onPress={() => this.scanCard()}>
        <CreditCardInput 
          onChange={(item) => this._onChange(item)}
          onPress={() => this.scanCard()}
          requiresName
          requiresCVC
        />
    </TouchableOpacity>
    </Layout>
  </KeyboardAwareScrollView>

  )
  onPress(state)
  {
    console.log(state)
    if(this.state.checkedInformations==true)
    {
      this.regPhone(state.phone);
      this.regEmail(state.email);
      if(this.isFormValid() && state.selectedOption!=null && state.creditCard.valid)
      {
      console.log("1 form geçerli ")
      let expiry = state.creditCard.values.expiry
      let year = "20";
      let position = 3;
      expiry = [expiry.slice(0, position), year, expiry.slice(position)].join('');
      let number = state.creditCard.values.number.replace(/\s/g, "")
      
      var paramsValues=[state.phone, state.email, number, state.creditCard.values.name, expiry, state.creditCard.values.cvc,
      "15546556",state.coordinate.latitude,state.coordinate.longitude,state.selectedOption];
      this.props.actions.setLostDevice(paramsValues)
      }else{
      console.log("form geçersiz")
      }
    }
    else{
      if(this.state.selectedOption!=null && state.creditCard.valid)
      {
        console.log("2 form geçerli ")
        let expiry = state.creditCard.values.expiry
        let year = "20";
        let position = 3;
        expiry = [expiry.slice(0, position), year, expiry.slice(position)].join('');
        let number = state.creditCard.values.number.replace(/\s/g, "")
        var paramsValues=[this.props.profile.user_phone, this.props.profile.user_mail, number, state.creditCard.values.name, expiry, 
        state.creditCard.values.cvc, "15546556",state.coordinate.latitude,state.coordinate.longitude,state.selectedOption];
        this.props.actions.setLostDevice(paramsValues)
      }
      else{
        console.log("form geçersiz")
      }
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <View>
        <Layout style={Styles.formContainer} level="1">
          <Select
            style={Styles.input}
            data={this.state.data}
            placeholder={this.state.selectedIndex == null ? "Cihazınızı seçiniz" : this.state.selectedIndex}
            onSelect={index => this.chooseDevice(index)}
            textStyle={Styles.customizeTextStyle}
            status="info"
          />
          <CheckBox
            style={Styles.checkbox}
            status="control"
            textStyle={Styles.bnColor}
            text='Kullanıcı iletişim bilgilerini kullan'
            checked={this.state.checkedInformations}
            onChange={this.onCheckedInformations}
        />
        {
          this.state.checkedInformations==true ?
          this.renderTextbox() :
          <View></View>
        }
        {
          this.creditCard()
        }
        <Button 
        onPress={() => this.onPress(this.state)} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
          Save Changes
        </Button>
        </Layout>
        </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    beacons: state.beaconListReducer,
    profile: state.profileReducer,
    login:state.loginReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getBeacons: bindActionCreators(BeaconListActions.getBeacons, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
      setLostDevice: bindActionCreators(LostBeaconActions.setLostBeacon, dispatch)
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(MissingDeclaration);
