import EHeader from '@commonComponents/EHeader';
import { AgentIcon, CallOutText } from '@commonComponents/MapIcons';
import { INavigation } from '@interfaces/common';
import { useRoute } from '@react-navigation/native';
import { mapKey } from '@utils/constant';
import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const LocateToThePlaces = ({ navigation }: INavigation) => {
    const route = useRoute();
    const { SelectedPlace } = route?.params;
    const [currentLocation, setCurrentLocation] = useState({
        latitude: null,
        longitude: null
    });
    const mapRef = useRef(null);

    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                const newLocation = { latitude: location.latitude, longitude: location.longitude };
                setCurrentLocation(newLocation);
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        ...newLocation,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }, 3000); // animate the map to the new region over 1 second
                }
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    };

    useEffect(() => {
        getCurrentLocation(); // Get initial location
        const intervalId = setInterval(getCurrentLocation, 3000); // Correct usage of setInterval
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const origin = { latitude: currentLocation.latitude, longitude: currentLocation.longitude };
    const destination = { latitude: SelectedPlace.latitude3, longitude: SelectedPlace.longitude3 };

    if (currentLocation.latitude === null || currentLocation.longitude === null) {
        return <View><EHeader title='map' /></View>; // Add a loading state if needed
    }

    return (
        <View style={{ flex: 1 }}>
            <EHeader title='map' />
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: parseFloat(origin.latitude ?? "23.046129737637894"),
                    longitude: parseFloat(origin.longitude ?? "72.56931602954866"),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    draggable
                    coordinate={{
                        latitude: parseFloat(origin.latitude ?? "23.046129737637894"),
                        longitude: parseFloat(origin.longitude ?? "72.56931602954866"),
                    }}
                    title='My Location'
                    description='I am here'
                    onDragEnd={(e) => console.log("location after dragged---", { x: e.nativeEvent.coordinate })}
                >
                    <AgentIcon />
                    <Callout style={{ height: 100, width: 200, borderWidth: 1 }}>
                        <CallOutText title={"this is my call out text"} />
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: parseFloat(destination.latitude ?? "23.046129737637894"),
                        longitude: parseFloat(destination.longitude ?? "72.56931602954866"),
                    }}
                    title='Destination'
                    description='This is the destination'
                />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={mapKey}
                    strokeWidth={3}
                    strokeColor="blue"
                />
            </MapView>
        </View>
    );
};

export default LocateToThePlaces;
