import Styles from './Styles';
<<<<<<< HEAD
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import ImagePicker from 'react-native-image-picker';
import getConnectionLink from '../../models/Connector'
import getBeacon from '../../models/Connector';
=======

import React, { Component } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import {
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  CameraIcon,
  CloseOutlineIcon,
} from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
// import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-picker';

>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
const options={
  title: 'Add image',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

export default class DeviceEdit extends Component {
  profile = Profile.jenniferGreen();
<<<<<<< HEAD
  isValid ={
    nameIsValid: false,
    typeIsValid: false,
    securityAreaIsValid: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      name: 'sıvık',
      type: 'tasma',
      securityArea: '500',
=======

  constructor(props) {
    super(props);
    this.state = {
      name: 'adsa',
      type: 'Çakar',
      securityArea: 'ugurcakar@hotmail.com',
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
      avatarSource: this.profile.photo,
      pic:null
    };
  }
<<<<<<< HEAD
  componentDidMount(){
    getBeacon()
  }
=======

  onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignUp2');
  };
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
  myfun=()=>{
    //alert('clicked');
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
  
      else {
        let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        this.setState({
          avatarSource: source,
          pic:response.data
        });
      }
    });
  }
<<<<<<< HEAD
  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon}  onPress={this.myfun}/>
  );
  onPress(state)
  {
    this.regName(state.name);
    this.regType(state.type);
    this.regSecurityArea(state.securityArea);
    if(this.isFormValid())
    {
      console.log("form geçerli")
    }else{
      console.log("form geçersiz")
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
  regName = (name) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(name))
    {
      this.isValid.nameIsValid=true
      return true
    }
    else{
      this.isValid.nameIsValid=false
      return false
    }
  }
  regType = (type) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(type))
    {
      this.isValid.typeIsValid=true
      return true
    }
    else{
      this.isValid.typeIsValid=false
      return false
    }
  }
  regSecurityArea = (securityArea) => {
    var re = /^(?:[1-9]|(?:[1-9][0-9])|(?:[1-4][0-9][0-9])|(?:500))$/;
    if(re.test(securityArea))
    {
      this.isValid.securityAreaIsValid=true
      return true
    }
    else{
      this.isValid.securityAreaIsValid=false
      return false
    }
  }
  // componentDidUpdate(prevProps)
  // {
  //   if(this.state!=prevProps.state)
  //   console.log("değştişti")
  // }
=======
  
  setEmail = () => { };
  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon}  onPress={this.myfun}/>
  );
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
  render() {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <ProfileAvatar
          style={Styles.profileAvatar}
          source={this.state.avatarSource}
          editButton={this.renderPhotoButton}
        />
        <Layout style={Styles.formContainer} level="1">
          <Input
<<<<<<< HEAD
            style={this.regName(this.state.name) ? Styles.input : Styles.emptyInput}
=======
            style={this.state.name ? Styles.input : Styles.emptyInput}
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
            value={this.state.name}
            label="Cihaz adı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
<<<<<<< HEAD
            onChangeText={item => this.setState({ name:item})}
            onIconPress={() => this.setState({ name: '' })}
            captionStyle={Styles.red}
            caption={this.regName(this.state.name) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regType(this.state.type) ? Styles.input : Styles.emptyInput}
=======
            onIconPress={() => this.setState({ name: '' })}
          />
          <Input
            style={this.state.type ? Styles.input : Styles.emptyInput}
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
            value={this.state.type}
            label="Türü"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
<<<<<<< HEAD
            onChangeText={item => this.setState({ type:item})}
            onIconPress={() => this.setState({ type: '' })}
            captionStyle={Styles.red}
            caption={this.regType(this.state.type) ? '' : 'Can not be empty'}
          />
          <Input
            style={this.regSecurityArea(this.state.securityArea) ? Styles.input : Styles.emptyInput}
=======
            onIconPress={() => this.setState({ type: '' })}
          />
          <Input
            style={this.state.securityArea ? Styles.input : Styles.emptyInput}
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
            value={this.state.securityArea}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
<<<<<<< HEAD
            onChangeText={item => this.setState({ securityArea:item})}
            onIconPress={() => this.setState({ securityArea: '' })}
            keyboardType={'numeric'}
            captionStyle={Styles.red}
            caption={this.regSecurityArea(this.state.securityArea) ? '' : 'must be 0-500'}
          />
        </Layout>
        <Button 
        onPress={() => this.onPress(this.state)} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor}  >
=======
            onIconPress={() => this.setState({ securityArea: '' })}
            keyboardType={'numeric'}
          />
          {/* <Text style={{fontSize:responsiveFontSize(2)}}>Güvenlik aralığı</Text>
          <Slider
          maximumValue={200}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={this.state.sliderValue}
          onValueChange={(sliderValue) => this.setState({ sliderValue })}
          style={{ width: '100%', height: '10%', marginTop:'2%' }}
        /> */}
        </Layout>
        <Button style={Styles.save} size="giant">
>>>>>>> d282ed4bcec05bcf1c2b5be8e425b23a52328867
          Save Changes
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
