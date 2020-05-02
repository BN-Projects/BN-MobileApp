import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Vibration} from 'react-native';
import {Text, Icon, Button} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LostBeaconModalActions from "../../redux/actions/lostBeaconModalActions";
import Torch from 'react-native-torch';


class Alarm extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            scrollOffset: null,
            loading:false,
            beacon_name:'',
            visible:false
        }
        this.scrollViewRef = React.createRef();
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
    // setVisible = () => {
    //   this.setState({
    //     loading:false,
    //   })
    //   this.props.actions.AlarmModalActions({isActive:false,beacon_name})
    // }
    componentDidMount()
    {
        setInterval(
            () => {this.isBeaconFar(this)}
        ,5000);
    }
    control = () => {
        if(this.props.alarmControl.flash)
        {
            Torch.switchState(true); // Turn ON
        }
        if(this.props.alarmControl.music)
        {
            
        }
        if(this.props.alarmControl.vibration)
        {
            Vibration.vibrate([1000,2000],true);
        }
    }
    isBeaconFar = (page) => {
            if(Array.isArray(this.props.getBeaconRange) && this.props.getBeaconRange.length)
            {
            for(let range of this.props.getBeaconRange){
                for(let item of this.props.getBeacons){
                    if(range.uuid==item.uuid)
                    {
                      console.log("eşit " + Math.floor(range.distance))
                        if(Math.floor(range.distance)>30)
                        {
                          console.log("bu "+Math.floor(range.distance))
                            page.setState({
                                beacon_name:item.beacon_name,
                                loading:true,
                                visible:true
                            })
                        }
                        //this.control()
                    }
                }
            }
            }
    }
    renderLoading = () => (
      <View style={styles.loading}>
        <Spinner/>
      </View>
    );
    close = () => {
        this.setState({
            loading:false,
            beacon_name:'',
            visible:false
        })
        Vibration.cancel();
        Torch.switchState(false); // Turn OFF
    }
    render() {
    return(
        <View>
          {
            this.state.loading==false
            ? this.renderLoading
            :
            <Modal
            testID={'modal'}
            isVisible={this.state.visible}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
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
                    Çok uzaklaştı: {this.state.beacon_name}
                  </Text>
                  <View style={styles.space}></View>
                  <Button onPress={this.close}
                  style={styles.save} 
                  size="giant" 
                  textStyle={styles.buttonColor}>Tamam</Button>
                </View>
              </ScrollView>
            </View>
            </Modal>
          
          }
        </View>
      )
  }
}
function mapStateToProps(state) {
    return {
      alarmControl:state.alarmControlReducer,
      getBeacons:state.beaconListReducer,
      getBeaconRange:state.beaconRangeReducer
    };
}
export default connect(mapStateToProps)(Alarm);
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    black:{
        fontSize: 20,
        color:'black'
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    space:{
        height: 10,
    },
    scrollableModal: {
        height: 150,
    },
    scrollableModalContent1: {
        height: 150,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
    },
    buttonColor: {
        color:"white"
    },
      save: {
        backgroundColor:'#55AFFB',
        borderColor:'#55AFFB',
        borderRadius:15
      },
});
