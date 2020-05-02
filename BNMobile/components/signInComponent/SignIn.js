import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon, PersonIcon, GoogleIcon, FacebookIcon, TwitterIcon } from './extra/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../redux/actions/loginActions";
import { Actions } from 'react-native-router-flux';
import * as ProfileActions from "../../redux/actions/profileActions";
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
    var paramsValues=["den57@gmail.com",hash];
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
    console.log("a")
    if(this.props.login.error==false)
    {
      console.log("false")
      Actions.drawerMenu();
      Actions.Device();
    }
    if(this.props.login.error==true)
    {
      console.log("true")
      this.setState({
        showError:true
      })
    }
  }
  render()
  {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            category='h2'
            status='control'>
            Benimki Nerede?
          </Text>
          <Text
            style={styles.signInLabel}
            category='h6'
            status='control'>
            Giriş Yap
          </Text>
        </View>
        <Layout
          style={styles.formContainer}
          level='1'>
          <Input
            style={styles.input}
            placeholder='Email'
            icon={PersonIcon}
            value={this.state.email}
            onChangeText={item => this.setState({email:item})}
            textStyle={styles.bnColor}
          />
          <Input
            style={styles.input}
            placeholder='Password'
            textStyle={styles.bnColor}
            icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
            value={this.state.password}
            onChangeText={item => this.setState({password:item})}
            secureTextEntry={!this.state.passwordVisible}
            onIconPress={this.onPasswordIconPress}
          />
          {
            this.state.showError==true ?
            <Text
            style={styles.error}
            status='danger'>
            Kullanıcı adı veya şifre hatalı
            </Text>:
            null
          }
          
          <Button
          style={styles.signInButton}
          textStyle={styles.buttonColor}
          size='giant'
          onPress={() => this.onSignUpButtonPress(this.state)}>
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
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
          textStyle={styles.bnColor}
          style={styles.signUpButton}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F0F3F6'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: '#55AFFB',
  },
  buttonColor: {
    color:"white"
  },
  bnColor: {
    color:'#55AFFB'
  },
  formContainer: {
    flex: 1,
    paddingTop:'5%',
    paddingHorizontal:'5%',
    backgroundColor:'#F0F3F6'
  },
  signInButton: {
    marginVertical:'4%',
    backgroundColor:'#55AFFB',
    borderColor:'#55AFFB',
    borderRadius:15
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16
  },
  input: {
    marginTop:'4%',
    borderColor: '#55AFFB',
  },
  emptyInput:{
    marginTop:'4%',
    borderColor: '#FF3D71',
  }, 
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
    color:'#55AFFB'
  },
  error:{
    marginTop: 5,
    alignSelf: 'center',
    marginBottom: 5,
    color:'#FF3D71'
  }
});

function mapStateToProps(state) {
  return {
    login: state.loginReducer,
    profile: state.profileReducer
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
