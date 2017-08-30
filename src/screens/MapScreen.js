import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

const testPolygons = [
    [
        {
            latitude: 36.979568,
            longitude: -122.008460
        },
        {
            latitude: 36.977147,
            longitude: -122.004132
        },
        {
            latitude: 36.972998,
            longitude: -122.010191
        },
        {
            latitude: 36.980864,
            longitude: -122.021120
        }
    ],
    [
        {
            latitude: 36.967465,
            longitude: -122.023284
        },
        {
            latitude: 36.967897,
            longitude: -122.015168
        },
        {
            latitude: 36.963402,
            longitude: -122.015818
        },
        {
            latitude: 36.962883,
            longitude: -122.027071
        }
    ]
];

class MapScreen extends Component {
    static navigationOptions = () => ({
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={24} color={tintColor} />;
        }
    })

    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        },
        polygons: testPolygons
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }

    onButtonPress = () => {
        // Pass callback function to action creator as
        // it does not have access to the navigation side
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    componentDidMount() {
        console.log('====================================');
        console.log(this.state.polygons);
        console.log('====================================');

        this.state.polygons.map((polygon, index) => {
            console.log('====================================');
            console.log(index);
            console.log('====================================');
        });
    }

    render() {
        // The map view currently has a bug where
        // the region is not correctly set on load.
        // The region is set correctly only after
        // the map is dragged
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    {
                        this.state.polygons.map(polygon => (
                            <MapView.Polygon
                                coordinates={polygon}
                                strokeColor="#F00"
                                fillColor="rgba(255,0,0,0.5)"
                                strokeWidth={1}
                            />
                        ))
                    }

                    <MapView.Marker
                        coordinate={{
                            latitude: 19.242306,
                            longitude: -103.732294
                        }}
                        title="Polygon Test"
                        description="This is a first test of a Polygon"
                    />
                </MapView>
                <View style={styles.buttonContainer} >
                    <Button
                        title="Search this area"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                        large
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
};


export default connect(null, actions)(MapScreen);
