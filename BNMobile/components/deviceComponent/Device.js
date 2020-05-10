import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Button, List, Text, Layout, Spinner} from '@ui-kitten/components';
import {ArrowRightIcon} from './extra/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import { Actions } from 'react-native-router-flux';
import Styles from './Styles';
class Device extends Component {
  constructor(props) {
    super(props);
    this.state={
      spinner: false
    }
    props.actions.getProfile([this.props.login])
  }
  onItemPress = (ID) => {
    Actions.replace("DeviceDetail",{ ID: ID })
  };
  renderLoading = () => (
    <View style={Styles.loading}>
      <Spinner/>
    </View>
  );
  componentDidMount(){
  }
  componentDidUpdate = () => {
    if(this.props.profile.error==false && this.state.spinner==false)
    {
      this.getBeaconList()
    }
  }
  getBeaconList()
  {
    this.props.actions.getBeacons([this.props.profile.user_id]);
    this.showSpinner()
  }
  showSpinner()
  {
    this.setState({
      spinner:true
    })
  }
  proximity(item){
    if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length)
    {
      var condition = this.props.getBeaconRange.map((range) =>{
        if(range.uuid==item.uuid)
        {
          return(
          <Text style={Styles.itemDescription} category="h6" status="control">
          {range.proximity}
          </Text>
          );
        }
        else{
          return(
            <Text style={Styles.itemDescription} category="h6" status="control">
              Tanımsız
            </Text>
          )
        }
      })
      return(condition);
    }
    else{
      return(
        <Text style={Styles.itemDescription} category="h6" status="control">
          Tanımsız
        </Text>
      )
      
    }
  }
    
  renderItem = info => (
    <View style={Styles.item}>
      <Layout style={Styles.itemImage}>
        <View style={Styles.layout}>
          <View style={Styles.left}>
            <Text style={Styles.itemTitle} category="h4" status="control">
              {info.item.beacon_name}
            </Text>
            <Text style={Styles.itemDescription} category="s1" status="control">
              Tür: {info.item.type}
            </Text>
          </View>
          <View style={Styles.right}>
              {this.proximity(info.item)}
          </View>
        </View>

        <View style={Styles.itemFooter}>
          <Image
            style={Styles.headerImage}
            source={{
              uri:info.item.img? info.item.img :
                'https://clipartart.com/images/default-profile-picture-clipart-1.jpg',
            }}
          />
          <View style={Styles.space}></View>
          <Button
            style={Styles.iconButton}
            appearance="outline"
            status="control"
            icon={ArrowRightIcon}
            onPress={() => this.onItemPress(info.item.beacon_id)}>
            {'Details'}
          </Button>
        </View>
      </Layout>
    </View>
  );
  render() {
    return (
      <Layout style={Styles.layout}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <>
          <List
          style={Styles.list}
          contentContainerStyle={Styles.listContent}
          data={this.props.beacons}
          renderItem={this.renderItem.bind()}
          />
        </>
        }
      </Layout>
      
    );
  }
}









function mapStateToProps(state) {
  return {
    beacons: state.beaconListReducer,
    profile: state.profileReducer,
    login:state.loginReducer,
    getBeaconRange:state.beaconRangeReducer
  };
}//reducer'dan çekilen veri props'lara işlendi
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getBeacons: bindActionCreators(BeaconListActions.getBeacons, dispatch),
      getProfile: bindActionCreators(ProfileActions.getProfile, dispatch),
    }
  };
}//actions alındı

export default connect(mapStateToProps, mapDispatchToProps)(Device);

