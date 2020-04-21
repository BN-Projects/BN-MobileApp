import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button, Icon, Spinner, Card, Layout, Input} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import * as LostBeaconListActions from "../../redux/actions/lostBeaconListActions";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from "redux";
import { Actions } from 'react-native-router-flux';
const pin = style => <Icon {...style} fill={'#fff'} name="pin" />;
const ArrowRightIcon = style => <Icon {...style} name='arrow-right' fill="#fff"/>
const CloseOutlineIcon = style => <Icon {...style} name='close-outline' fill="#55AFFB"/>
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 41.0329,
        longitude: 29.1014,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker:"",
      // marker: {
      //   latitude: 41.0329,
      //   longitude: 29.1014,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // },
      isModalVisible: false,
      scrollOffset: null,
      spinner: false,
      addItemModalVisible:false,
      newItemDes:''
    };
    this.scrollViewRef = React.createRef();
    this.map = React.createRef();
  }
  isValid ={
    newItemDesIsValid: false,
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
  regNewItemDes = (newItemDes) => {
    var re = /(.|\s)*\S(.|\s)*/;
    if(re.test(newItemDes))
    {
      this.isValid.newItemDesIsValid=true
      return true
    }
    else{
      this.isValid.newItemDesIsValid=false
      return false
    }
  }
  isVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  zoomDelta = 0.005;
  onZoom = zoomSign => {
    let zoomedRegion = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta:
        this.state.region.latitudeDelta - this.zoomDelta * zoomSign,
      longitudeDelta:
        this.state.region.longitudeDelta - this.zoomDelta * zoomSign,
    };
    this.onRegionChange(zoomedRegion);
    if (this.map.current != null) {
      this.map.current.animateToRegion(zoomedRegion);
    }
    //this.state.map.current!.animateToRegion(zoomedRegion);
  };
  onZoomIn = () => this.onZoom(1);
  onZoomOut = () => this.onZoom(-1);
  componentDidMount()
  {
    console.log("lostdevice kullanıcı id "+this.props.profile.user_id)
    this.props.actions.getLostBeacons([this.props.profile.user_id]);
  }
  renderLoading = () => (
    <View style={styles.loading}>
      <Spinner/>
    </View>
  );
  onRegionChange = region => {
    this.setState({
      region: region,
    });
  };
  // adddMarker(state) {
  //   let regionToBeMarked = {
  //       latitude: state.region.latitude,
  //       longitude: state.region.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //   };
  //   this.setState({
  //       marker: regionToBeMarked,
  //   });
  //   this.showMarker();
  // }
  showLostBeaconsMarkers(lostBeacons)
  {
    console.log(lostBeacons)
    if(lostBeacons=="")
    {
      return <View></View>
    }
    else{
      return lostBeacons.map((marker, index) => {
        console.log("döküyo "+marker)
        let coordinate = {
          latitude: marker.lost_lat,
          longitude: marker.lost_long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
        return (
          <Marker
            pinColor={'#55AFFB'}
            coordinate={coordinate}
            description={marker.lost_desc}
            title={marker.lost_date}
            key={index}
            onPress={this.isVisible}
          />
        );
      });
    }
  }
  showaddItemModal = () => {
    this.setState({
        addItemModalVisible:!this.state.addItemModalVisible,
    })
  }
  addMarker(state) {
    this.regNewItemDes(state.newItemDes);
    if(this.isFormValid())
    {
      console.log("form geçerli")
      this.showaddItemModal();
    let regionToBeMarked = {
        latitude: state.region.latitude,
        longitude: state.region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    this.setState({
        marker: regionToBeMarked,
    });
    this.showMarker();
    }else{
      console.log("form geçersiz")
    }
  }
  showMarker() {
      return (
        <Marker
          pinColor={'#55AFFB'}
          coordinate={this.state.marker}
          description={this.state.newItemDes}
          onPress={this.isVisible}
        />
      );
  }
  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  handleScrollTo = p => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };
  modal(device)
  {
    console.log("bu cihaz "+device)
    return(
      <View>
      <Modal
        testID={'modal'}
        isVisible={this.state.isModalVisible}
        onSwipeComplete={this.close}
        swipeDirection={['down']}
        scrollTo={this.handleScrollTo}
        onBackdropPress={this.isVisible}
        onBackButtonPress={this.isVisible}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <ScrollView
            ref={this.scrollViewRef}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}>
            <View style={styles.scrollableModalContent1}>
              <Text style={styles.scrollableModalText1}>
                You can scroll me up! 👆
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      </View>
    )
  }
  addModal()
  {
    return(
      <Modal style={styles.modalContainer}
          visible={this.state.addItemModalVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.setState({addItemModalVisible:false})}>
          <Card disabled={true}>
              
        <KeyboardAwareScrollView>
            <Layout style={styles.formContainer} level="1">
                <Input
                    style={this.regNewItemDes(this.state.newItemDes) ? styles.successInput : this.state.newItemDes=='' ? styles.input : styles.emptyInput }
                    value={this.state.newItemDes}
                    label="Detay"
                    labelStyle={styles.customizeLabelStyle}
                    textStyle={styles.customizeTextStyle}
                    icon={CloseOutlineIcon}
                    onChangeText={item => this.setState({ newItemDes:item})}
                    onIconPress={() => this.setState({ newItemDes: '' })}
                />
            </Layout>
            <Button 
            onPress={() => this.addMarker(this.state)} 
            style={styles.save} 
            size="giant" 
            textStyle={styles.buttonColor}  >
            Save Changes
            </Button>
            </KeyboardAwareScrollView>
          </Card>
        </Modal>
       
    )
  }
  goToAddLostDevice(state)
  {
    Actions.replace("MissingDeclaration",{ coordinate: state.marker , desc:state.newItemDes})
  }
  render() {
    return (
        <View style={styles.container}>
            <MapView
              style={styles.map}
              ref={this.map}
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChange}
              provider="google">
              {this.state.marker=="" ? <View></View> : this.showMarker()}
              {this.props.lostBeacons=="" ? <View></View> : this.showLostBeaconsMarkers(this.props.lostBeacons)}
            </MapView>
            <View style={styles.buttonContainer}> 
              <TouchableOpacity style={styles.button} onPress={this.onZoomIn}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              <TouchableOpacity style={styles.button} onPress={this.onZoomOut}>
                <Text style={styles.text}>-</Text>
              </TouchableOpacity>
              <View style={styles.spacer} />
              <TouchableOpacity style={styles.button}>
                <Button
                  onPress={() => this.showaddItemModal()}
                  style={styles.add}
                  size={'tiny'}
                  icon={pin}
                  status={'control'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.continueContainer}>
              <TouchableOpacity style={styles.button}>
                <Button
                  disabled={this.state.marker=="" ? true : false}
                  style={styles.add}
                  size={'tiny'}
                  icon={ArrowRightIcon}
                  status={'control'}
                  onPress={() => this.goToAddLostDevice(this.state)}
                />
              </TouchableOpacity>
            </View>      
            {this.modal()}
            {this.addModal()}
           </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    lostBeacons: state.lostBeaconListReducer,
    profile: state.profileReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getLostBeacons: bindActionCreators(LostBeaconListActions.getLostBeacons, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    end: 20,
    borderRadius: 5,
    backgroundColor: '#55AFFB',
    paddingVertical: 3,
  },
  continueContainer: {
    position: 'absolute',
    top: 30,
    end: 20,
    borderRadius: 5,
    backgroundColor: '#55AFFB',
    paddingVertical: 3,
  },
  button: {},
  text: {
    textAlign: 'center',
    color: '#fff',
  },
  spacer: {
    marginVertical: 5,
  },
  add: {
    backgroundColor: '#55AFFB',
    borderWidth: 0,
  },
  buttonColor: {
    color:"white"
  },
  save: {
    backgroundColor:'#55AFFB',
    borderColor:'#55AFFB',
    borderRadius:15
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  successInput: {
    marginTop:'2%',
    borderColor: '#28a745',
  },
  input: {
    marginTop:'2%',
    borderColor: '#55AFFB',
  },
  emptyInput:{
    marginTop:'2%',
    borderColor: '#FF3D71',
  },
});
