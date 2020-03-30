// import Styles from './Styles';

// import React, {Component} from 'react';
// import {View, Image, StyleSheet} from 'react-native';
// import {Button, Input, Layout} from '@ui-kitten/components';
// import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Uğur',
//       surname: 'Çakar',
//       email: 'ugurcakar@hotmail.com',
//       phone: '5555555555',
//       password: 'baguvix',
//       passwordVisible: false,
//     };
//   }

//   onSignUpButtonPress = () => {
//     navigation && navigation.navigate('SignUp2');
//   };
//   onPasswordIconPress = () => {
//     this.setState({
//       passwordVisible: !this.state.passwordVisible,
//     });
//   };
//   setEmail = () => {};
//   render() {
//     return (
//       <KeyboardAwareScrollView>
//         <View style={Styles.container}>
//         <View style={Styles.headerContainer}>
//           <Image
//             style={Styles.headerImage}
//             source={{
//               uri:
//                 'https://lh6.googleusercontent.com/proxy/Bqqq2DHYLI-9bYWmUQkSz7UdLfvGavr6tPysMgBl6y7GDFFwc1dwlxqOr0tCtkWVVRfXI9j-fx-0LM5f-GW2jWfm4aCIkj5HJmwDuTL8h4mh5uzlR0plpUk',
//             }}
//           />
//         </View>
//         <Layout style={Styles.formContainer} level="1">
//         <Input
//             style={this.state.name ? Styles.input : Styles.emptyInput}
//             placeholder='name'
//             icon={PersonIcon}
//             value={this.state.name}
//             onChangeText={item => this.setState({name:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.surname ? Styles.input : Styles.emptyInput}
//             placeholder='surname'
//             icon={PersonIcon}
//             value={this.state.surname}
//             onChangeText={item => this.setState({surname:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.email ? Styles.input : Styles.emptyInput}
//             placeholder='Email'
//             icon={PersonIcon}
//             value={this.state.email}
//             onChangeText={item => this.setState({email:item})}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.phone ? Styles.input : Styles.emptyInput}
//             placeholder='Email'
//             icon={PersonIcon}
//             value={this.state.phone}
//             onChangeText={item => this.setState({phone:item})}
//             keyboardType={"numeric"}
//             textStyle={Styles.bnColor}
//           />
//           <Input
//             style={this.state.password ? Styles.input : Styles.emptyInput}
//             placeholder='Password'
//             textStyle={Styles.bnColor}
//             icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
//             value={this.state.password}
//             onChangeText={item => this.setState({password:item})}
//             secureTextEntry={!this.state.passwordVisible}
//             onIconPress={this.onPasswordIconPress}
//           />
//           <Button 
//             onPress={this.onPress} 
//             style={Styles.save} 
//             size="giant" 
//             textStyle={Styles.buttonColor} 
//             disabled={this.state.name && this.state.type && this.state.securityArea?false:true} >
//               Save Changes
//           </Button>
//         </Layout>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
// // const Styles = StyleSheet.create({
// //   container: {
// //     backgroundColor:'#F0F3F6'
// //   },
// //   headerContainer: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     minHeight: 216,
// //     backgroundColor: '#55AFFB',
// //   },
// //   buttonColor: {
// //     color:"white"
// //   },
// //   save: {
// //     marginVertical:'4%',
// //     backgroundColor:'#55AFFB',
// //     borderColor:'#55AFFB',
// //     borderRadius:15
// //   },
// //   bnColor: {
// //     color:'#55AFFB'
// //   },
// //   formContainer: {
// //     flex: 1,
// //     paddingTop:'5%',
// //     paddingHorizontal:'5%',
// //     backgroundColor:'#F0F3F6'
// //   },
// //   signInButton: {
// //     marginVertical:'4%',
// //     backgroundColor:'#55AFFB',
// //     borderColor:'#55AFFB',
// //     borderRadius:15
// //   },
// //   signUpButton: {
// //     marginVertical: 12,
// //     marginHorizontal: 16
// //   },
// //   input: {
// //     marginTop:'4%',
// //     borderColor: '#55AFFB',
// //   },
// //   emptyInput:{
// //     marginTop:'4%',
// //     borderColor: '#FF3D71',
// //   }, 
// //   socialAuthContainer: {
// //     marginTop: 32,
// //   },
// //   socialAuthButtonsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-evenly',
// //   },
// //   socialAuthHintText: {
// //     alignSelf: 'center',
// //     marginBottom: 16,
// //     color:'#55AFFB'
// //   },
// // });



import Styles from './Styles';
import React, { Component } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { CameraIcon, CloseOutlineIcon, EyeIcon, EyeOffIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import ImagePicker from 'react-native-image-picker';

const options={
  title: 'Add image',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

export default class ProfileAccount extends Component {
  profile = Profile.jenniferGreen();

  constructor(props) {
    super(props);
    this.state = {
      name: 'Uğur',
      surname: 'Çakar',
      email: 'ugurcakar@hotmail.com',
      phone: '5555555555',
      password: 'baguvix',
      passwordVisible: false,
      avatarSource: this.profile.photo,
      pic:null
    };
  }
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
  onPress()
  {
    console.log("a")
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible:!this.state.passwordVisible
    })
  };

  renderPhotoButton = () => (
    <Button style={Styles.editAvatarButton} status={'info'} icon={CameraIcon}  onPress={this.myfun}/>
  );
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
            style={this.state.name ? Styles.input : Styles.emptyInput}
            value={this.state.name}
            label="Cihaz adı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ name:item})}
            onIconPress={() => this.setState({ name: '' })}
          />
          <Input
            style={this.state.surname ? Styles.input : Styles.emptyInput}
            value={this.state.surname}
            label="Türü"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ surname:item})}
            onIconPress={() => this.setState({ surname: '' })}
          />
          <Input
            style={this.state.email ? Styles.input : Styles.emptyInput}
            value={this.state.email}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ email:item})}
            onIconPress={() => this.setState({ email: '' })}
          />
          <Input
            style={this.state.phone ? Styles.input : Styles.emptyInput}
            value={this.state.phone}
            label="Güvenlik aralığı"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.customizeTextStyle}
            icon={CloseOutlineIcon}
            onChangeText={item => this.setState({ phone:item})}
            onIconPress={() => this.setState({ phone: '' })}
            keyboardType={'numeric'}
          />
          <Input
            style={this.state.password ? Styles.input : Styles.emptyInput}
            placeholder='Password'
            label="Şifre"
            labelStyle={Styles.customizeLabelStyle}
            textStyle={Styles.bnColor}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            value={this.state.password}
            onChangeText={item => this.setState({password:item})}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
        </Layout>
        <Button 
        onPress={this.onPress} 
        style={Styles.save} 
        size="giant" 
        textStyle={Styles.buttonColor} >
          Save Changes
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}
