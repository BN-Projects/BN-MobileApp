import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Icon} from '@ui-kitten/components';
import {Button} from '@ui-kitten/components';

const pin = style => <Icon {...style} fill={'#fff'} name="pin" />;
const ArrowRightIcon = style => <Icon {...style} name='arrow-right' fill="#fff"/>

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 41.0329,
        longitude: 29.1014,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker:
        {
            latitude: 41.0329,
            longitude: 29.1014,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
    };
    this.map = React.createRef();
  }
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

  onRegionChange = region => {
    this.setState({
      region: region,
    });
  };
  addMarker(state) {
    let regionToBeMarked = {
        latitude: state.region.latitude,
        longitude: state.region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    this.setState({
        marker: regionToBeMarked,
    });
    this.showMarkers();
  }
  showMarkers() {
      return (
        <Marker
          pinColor={'#55AFFB'}
          coordinate={this.state.marker}
        />
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={this.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={false}
          provider="google">
          {this.showMarkers()}
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
              onPress={() => this.addMarker(this.state)}
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
              style={styles.add}
              size={'tiny'}
              icon={ArrowRightIcon}
              status={'control'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    minHeight: 400,
    minWidth:300
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  formContainer: {
    flex: 1,
  },
  input: {
    marginTop:'2%',
    borderColor: '#55AFFB',
  },
  emptyInput:{
    marginTop:'2%',
    borderColor: '#FF3D71',
  },
  red:{
    color: '#FF3D71',
  },
  customizeTextStyle:{
    color:'#55AFFB',
  },
  customizeLabelStyle:{
    color:'black'
  },
  buttonColor: {
    color:"white"
  },
  save: {
    marginVertical:'4%',
    backgroundColor:'#55AFFB',
    borderColor:'#55AFFB',
    borderRadius:15
  },
});
