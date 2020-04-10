// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import MapView, {
//   Marker,
//   Callout,
//   CalloutSubview,
//   ProviderPropType,
// } from 'react-native-maps';
// import CustomCallout from './customMap';


// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;


// export default class Map extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//           cnt: 0,
//           region: {
//             latitude: LATITUDE,
//             longitude: LONGITUDE,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           },
//           markers: [
//             {
//               coordinate: {
//                 latitude: LATITUDE + SPACE,
//                 longitude: LONGITUDE + SPACE,
//               },
//             },
//             {
//               coordinate: {
//                 latitude: LATITUDE + SPACE,
//                 longitude: LONGITUDE - SPACE,
//               },
//             },
//             {
//               coordinate: {
//                 latitude: LATITUDE,
//                 longitude: LONGITUDE,
//               },
//             },
//             {
//               coordinate: {
//                 latitude: LATITUDE,
//                 longitude: LONGITUDE - SPACE / 2,
//               },
//             },
//           ],
//         };
//       }
//       show() {
//         this.marker1.showCallout();
//       }

//       hide() {
//         this.marker1.hideCallout();
//       }

//       render() {
//         const { region, markers } = this.state;
//         return (
//           <View style={styles.container}>
//             <MapView
//               provider={this.props.provider}
//               style={styles.map}
//               initialRegion={region}
//               zoomTapEnabled={false}
//             >
//               <Marker
//                 ref={ref => {
//                   this.marker1 = ref;
//                 }}
//                 coordinate={markers[0].coordinate}
//                 title="This is a native view"
//                 description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
//               />
//               <Marker coordinate={markers[1].coordinate}>
//                 <Callout style={styles.plainView}>
//                   <View>
//                     <Text>This is a plain view</Text>
//                   </View>
//                 </Callout>
//               </Marker>
//               <Marker
//                 coordinate={markers[2].coordinate}
//                 calloutOffset={{ x: -8, y: 28 }}
//                 calloutAnchor={{ x: 0.5, y: 0.4 }}
//                 ref={ref => {
//                   this.marker2 = ref;
//                 }}
//               >
//                 <Callout
//                   alphaHitTest
//                   tooltip
//                   onPress={e => {
//                     if (
//                       e.nativeEvent.action === 'marker-inside-overlay-press' ||
//                       e.nativeEvent.action === 'callout-inside-press'
//                     ) {
//                       return;
//                     }

//                     Alert.alert('callout pressed');
//                   }}
//                   style={styles.customView}
//                 >
//                   <CustomCallout>
//                     <Text>{`This is a custom callout bubble view ${
//                       this.state.cnt
//                     }`}</Text>
//                     <CalloutSubview
//                       onPress={() => {
//                         this.setState({ cnt: this.state.cnt + 1 }, () => {
//                           this.marker2.redrawCallout();
//                         });
//                       }}
//                       style={[styles.calloutButton]}
//                     >
//                       <Text>Click me</Text>
//                     </CalloutSubview>
//                   </CustomCallout>
//                 </Callout>
//               </Marker>
//               <Marker
//                 ref={ref => {
//                   this.marker4 = ref;
//                 }}
//                 coordinate={markers[3].coordinate}
//                 title="You can also open this callout"
//                 description="by pressing on transparent area of custom callout"
//               />
//             </MapView>
//             <View style={styles.buttonContainer}>
//               <View style={styles.bubble}>
//                 <Text>Tap on markers to see different callouts</Text>
//               </View>
//             </View>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 onPress={() => this.show()}
//                 style={[styles.bubble, styles.button]}
//               >
//                 <Text>Show</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => this.hide()}
//                 style={[styles.bubble, styles.button]}
//               >
//                 <Text>Hide</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         );
//       }

// }
// Map.propTypes = {
//     provider: ProviderPropType,
//   };
// // const styles = StyleSheet.create({
// //     container: {
// //         ...StyleSheet.absoluteFillObject,
// //     },
// //     map: {
// //         ...StyleSheet.absoluteFillObject
// //     }
// // })
// const styles = StyleSheet.create({
//     customView: {
//       width: 140,
//       height: 140,
//     },
//     plainView: {
//       width: 60,
//     },
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     map: {
//       ...StyleSheet.absoluteFillObject,
//     },
//     bubble: {
//       flex: 1,
//       backgroundColor: 'rgba(255,255,255,0.7)',
//       paddingHorizontal: 18,
//       paddingVertical: 12,
//       borderRadius: 20,
//     },
//     latlng: {
//       width: 200,
//       alignItems: 'stretch',
//     },
//     button: {
//       width: 80,
//       paddingHorizontal: 12,
//       alignItems: 'center',
//       marginHorizontal: 10,
//     },
//     buttonContainer: {
//       flexDirection: 'row',
//       marginVertical: 20,
//       backgroundColor: 'transparent',
//     },
//     calloutButton: {
//       width: 'auto',
//       backgroundColor: 'rgba(255,255,255,0.7)',
//       paddingHorizontal: 6,
//       paddingVertical: 6,
//       borderRadius: 12,
//       alignItems: 'center',
//       marginHorizontal: 10,
//       marginVertical: 10,
//     },
//   });

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { Icon, Menu } from '@ui-kitten/components';
import { Button } from '@ui-kitten/components';

const pin = (style) => (
    <Icon {...style} fill={'#fff'} name='pin' />
);

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
            markers: [
                {
                    id: 1,
                    coordinate: {
                        latitude: 41.0329,
                        longitude: 29.1014,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,

                    },
                    title: 'Foo Place',
                    subtitle: '1234 Foo Drive'
                }
            ]
        }
        this.map = React.createRef();
    }
    zoomDelta = 0.005;
    onZoom = (zoomSign) => {
        let zoomedRegion = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta - this.zoomDelta * zoomSign,
            longitudeDelta: this.state.region.longitudeDelta - this.zoomDelta * zoomSign,
        };
        this.onRegionChange(zoomedRegion)
        if (this.map.current != null) {
            this.map.current.animateToRegion(zoomedRegion);
        }
        //this.state.map.current!.animateToRegion(zoomedRegion);
    };
    onZoomIn = () => this.onZoom(1);
    onZoomOut = () => this.onZoom(-1);

    onRegionChange = (region) => {
        this.setState({
            region: region
        });
    }
    addMarker() {

    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
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
                    provider="google"
                >
                    {this.state.markers.map(marker => {
                        return (
                            <Marker
                                pinColor={'#55AFFB'}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.subtitle}
                                key={marker.id}
                            />
                        )
                    })
                    }
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
                    <TouchableOpacity style={styles.button} onPress={this.onZoomOut}>
                        <Button
                            onPress={() => this.addMarker()}
                            style={styles.add}
                            size={"tiny"}
                            icon={pin}
                            status={"control"} >
                        </Button>
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
    map: {
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        end: 20,
        borderRadius: 5,
        backgroundColor: '#55AFFB',
        paddingVertical: 3,
    },
    button: {},
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    spacer: {
        marginVertical: 5,
    },
    add: {
        backgroundColor: '#55AFFB',
        borderWidth: 0
    }
})