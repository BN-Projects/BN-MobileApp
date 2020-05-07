import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Button, List, Text, Layout, Spinner} from '@ui-kitten/components';
import {ArrowRightIcon} from './extra/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as BeaconListActions from "../../redux/actions/beaconListActions";
import * as ProfileActions from "../../redux/actions/profileActions";
import { Actions } from 'react-native-router-flux';
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
    // Actions.DeviceDetail({ID: ID})
  };
  renderLoading = () => (
    <View style={styles.loading}>
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
    console.log("asda "+this.props.profile.user_id)
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
          console.log(range)
          return(
          <Text style={styles.itemDescription} category="h6" status="control">
          {range.proximity}
          </Text>
          );
        }
        else{
          return(
            <Text style={styles.itemDescription} category="h6" status="control">
              Tanımsız
            </Text>
          )
        }
      })
      return(condition);
    }
    else{
      return(
        <Text style={styles.itemDescription} category="h6" status="control">
          Tanımsız asdasda
        </Text>
      )
      
    }
  }
    
  renderItem = info => (
    <View style={styles.item}>
      <Layout style={styles.itemImage}>
        <View style={styles.layout}>
          <View style={styles.left}>
            <Text style={styles.itemTitle} category="h4" status="control">
              {info.item.beacon_name}
            </Text>
            <Text style={styles.itemDescription} category="s1" status="control">
              Tür: {info.item.type}
            </Text>
          </View>
          <View style={styles.right}>
              {this.proximity(info.item)}
          </View>
        </View>

        <View style={styles.itemFooter}>
          <Image
            style={styles.headerImage}
            source={{
              uri:info.item.img? info.item.img :
                'https://clipartart.com/images/default-profile-picture-clipart-1.jpg',
            }}
          />
          <View style={styles.space}></View>
          <Button
            style={styles.iconButton}
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
      <Layout style={styles.layout}>
        {
          this.state.spinner == false ?
          this.renderLoading()
        :
        <>
          <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
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

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 75,
    flex: 1,
  },
  item: {
    marginVertical: '3%',
    height: 180,
    borderRadius: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#55AFFB',
    borderRadius: 15,
  },
  itemDescription: {
    marginVertical: '5%',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconButton: {
    flex: 3
  },
  space: {
    flex:3
  },
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    borderRadius: 75,
    flex: 2,
  },
});
