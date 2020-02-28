/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

import {BeaconMonitoringAndRanging} from './beaconMonitoringAndRanging';
import BouncyDrawer from 'react-native-bouncy-drawer';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {
  Icon,
  Menu,
} from '@ui-kitten/components';

const Ap: () => React$Node = () => {
  // return (
  //   <>
  //     <StatusBar barStyle="dark-content" />
  //     <SafeAreaView>
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={styles.scrollView}>
  //         <BeaconMonitoringAndRanging/>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </>
  // );
};
const data = [
  {
    title: 'Item 1',
    icon: StarIcon,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
  },
  {
    title: 'Item 3',
    icon: StarIcon,
  },
  {
    title: 'Item 4',
    icon: StarIcon,
  },
];
const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export class DrawerMenu extends Component{
  constructor(props){
    super(props);
    this.state={
      headerHeight:Platform.select({ios: 60,android: 50})    
    }
  }
  render(){
    var page = this.props.renderPage && !this.state.open?this.props.renderPage:null;
    return (
      <View style={{marginBottom:this.state.headerHeight}}>
      <BouncyDrawer
        willOpen={() => this.setState({open:true})}
        didOpen={() => console.log('did open')}
        willClose={() => this.setState({open:false})}
        didClose={() => console.log('didClocse')}
        title="BN-Mobil"
        titleStyle={{ color: '#0bc1f1', fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize: 20, marginLeft: -3 }}
        closedHeaderStyle={{ backgroundColor: '#fff' }}
        defaultOpenButtonIconColor="#0bc1f1"
        defaultCloseButtonIconColor="#0bc1f1"
        renderContent={<DrawerMenuContent/>}
        closeButtonPosition='right'
        content={this.props.renderPage}
        openedHeaderStyle={{ backgroundColor: '#fff' }
      }
        />
        <View style={{marginTop:this.state.headerHeight}}>
        {
          page
        }
        </View>
      </View>
    );
  }
  componentDidMount(){
    
  }
}
class DrawerMenuContent extends Component{
  constructor(props){
    super(props);
    this.state={
      headerHeight:Platform.select({ios: 60,android: 50})    
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.profileBox}>
            <View style={styles.profileAvatar}>
                <FAIcon name={'user'} color={'white'} size={20}></FAIcon>
            </View>
            <Text style={styles.profileName}>BN-Mobil</Text>
        </View>
        <Menu
      data={data}
      selectedIndex={this.state}
      onSelect={(index)=>this.setSelectedIndex(index)}
    />
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <FAIcon size={16} name={'door-open'}></FAIcon>
            <Text style={{marginLeft:15}}>Çıkış Yap</Text>
          </View>
        </View>
      </View>
    )
  }
  setSelectedIndex(index){
    this.setState({ index });
    this.props.pageChange(index)
  }
}
const styles = StyleSheet.create({
    profileBox:{
      width:'100%',
      backgroundColor:'#0a7eff',
      height:'25%',
      paddingTop:'13%',
      paddingLeft:'10%'
    },
    profileAvatar:{
      width: 54,
      height: 54,
      backgroundColor:'#0bc1f1',
      borderRadius: 54/2,
      justifyContent:'center',
      alignItems:'center',
    },
    profileName:{
      fontSize:20,
      color:'white',
      paddingTop:'2%',
      fontWeight:'bold'
    },
    list:{height:'65%',width:'100%',backgroundColor:'#0bc1f1'},
    listItem:{color:"white",marginLeft:40,marginTop:65,fontSize:14},
    footer:{height:'10%',width:'100%',backgroundColor:'white'},
    footerContent:{flexDirection:'row',marginLeft:40,marginTop:15},

});

export default Menu;
