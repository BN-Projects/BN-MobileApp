import React, { Component } from 'react';
import { View} from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon, PersonIcon, GoogleIcon, FacebookIcon, TwitterIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../redux/actions/loginActions";
import { Actions } from 'react-native-router-flux';
import * as ProfileActions from "../../redux/actions/profileActions";
import Styles from './Styles';
import md5 from 'md5';
class SıgnIn extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      email:"",
      password:"",
      passwordVisible:false,
      showError:false
    }
  }
    

  onSignUpButtonPress(){
    var hash = md5("deneme");
    var paramsValues=["den57@gmail.com",hash,this.props.getPush];
    //var paramsValues=[this.state.email,md5(this.state.password)];
    this.props.actions.getToken(paramsValues);
  }
  onPasswordIconPress = () => {
    this.setState({
      passwordVisible:!this.state.passwordVisible
    })
  };
  componentDidUpdate = () =>
  {
    if(this.props.login.error==false)
    {
      Actions.drawerMenu();
      Actions.Device();
    }
    if(this.props.login.error==true)
    {
      this.setState({
        showError:true
      })
    }
  }
  render()
  {
    return (
      <KeyboardAwareScrollView style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text
            category='h2'
            status='control'>
            Benimki Nerede?
          </Text>
          <Text
            style={Styles.signInLabel}
            category='h6'
            status='control'>
            Giriş Yap
          </Text>
        </View>
        <Layout
          style={Styles.formContainer}
          level='1'>
          <Input
            style={Styles.input}
            placeholder='Email'
            icon={PersonIcon}
            value={this.state.email}
            onChangeText={item => this.setState({email:item})}
            textStyle={Styles.bnColor}
          />
          <Input
            style={Styles.input}
            placeholder='Password'
            textStyle={Styles.bnColor}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            value={this.state.password}
            onChangeText={item => this.setState({password:item})}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
          {
            this.state.showError==true ?
            <Text
            style={Styles.error}
            status='danger'>
            Kullanıcı adı veya şifre hatalı
            </Text>:
            null
          }
          
          <Button
          style={Styles.signInButton}
          textStyle={Styles.buttonColor}
          size='giant'
          onPress={() => this.onSignUpButtonPress(this.state)}>
          SIGN IN
        </Button>
        <View style={Styles.socialAuthContainer}>
          <Text
            style={Styles.socialAuthHintText}
            status='control'>
            Or Sign In using Social Media
          </Text>
          <View style={Styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              icon={TwitterIcon}
            />
          </View>
        </View>
        
        <Button
          textStyle={Styles.bnColor}
          style={Styles.signUpButton}
          appearance='ghost'
          status='basic'
          >
          Don't have an account? Create
        </Button>
        </Layout>
        
      </KeyboardAwareScrollView>
    );
  }
  
};
function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    profile: state.profileReducer,
    getPush: state.pushReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getToken: bindActionCreators(LoginActions.getToken, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(SıgnIn);
