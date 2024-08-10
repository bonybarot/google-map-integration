import EHeader from '@commonComponents/EHeader';
import EText from '@commonComponents/EText';
import { AgentIcon, CallOutText } from '@commonComponents/MapIcons';
import { INavigation } from '@interfaces/common';
import { useRoute } from '@react-navigation/native';
import { mapKey } from '@utils/constant';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';

const RoutingBetweenTwoPlaces = ({ navigation }: INavigation) => {
    const route = useRoute()
    const { SelectedPlaces } = route?.params
    const [distance, setDistance] = useState()
    const [time, setTime] = useState()
    const origin = { latitude: SelectedPlaces?.latitude1, longitude: SelectedPlaces?.longitude1 };
    const destination = { latitude: SelectedPlaces?.latitude2, longitude: SelectedPlaces?.longitude2 };
    // const origin = { latitude: "23.04688005066613", longitude: "72.56997585296632" };
    // const destination = { latitude: "23.04555712751455", longitude: "72.561993598938" };
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return (
        <View style={{ flex: 1 }}>
            <EHeader title='map' />
            <View style={{ alignItems: "center" }}>
                <EText>Distance : {distance} KM</EText>
                <EText>Time: {hours} hours {minutes.toFixed(0)} minutes</EText>
            </View>
            <MapView
                // ref={mapRef}
                mapType="hybrid"
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={{
                    latitude: parseFloat(origin?.latitude ?? "23.046129737637894"),
                    longitude: parseFloat(origin?.longitude ?? "72.56931602954866"),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

                {origin?.latitude &&
                    <Marker
                        draggable
                        coordinate={{
                            latitude: parseFloat(origin?.latitude),
                            longitude: parseFloat(origin?.longitude),
                        }}
                        title='My Location'
                        description='I am here'
                        onDragEnd={(e) => console.log("loacation after dragged---", { x: e.nativeEvent.coordinate })}
                    >

                        {/* custom icon created */}
                        <AgentIcon />

                        {/* show message on press icon */}
                        <Callout style={{ height: 100, width: 200, borderWidth: 1 }}>
                            <CallOutText title={"this is my call out text"} />
                        </Callout>
                    </Marker>
                }
                {destination?.latitude &&
                    <Marker
                        coordinate={{
                            latitude: parseFloat(destination?.latitude),
                            longitude: parseFloat(destination?.longitude),
                        }}
                        title='My Location'
                        description='I am here'
                    />
                }
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={mapKey}
                    strokeWidth={3}
                    strokeColor="blue"
                    onReady={Result => {
                        console.log("Result.distance.toFixed(2)", Result.duration.toFixed(2))
                        setDistance(Result.distance.toFixed(2));
                        setTime(Result.duration.toFixed(2))
                    }
                    }
                />
                <Marker
                    coordinate={{
                        latitude: parseFloat("23.046129737637894"),
                        longitude: parseFloat("72.56931602954866"),
                    }}
                    title='My Location'
                    description='I am here'
                />
            </MapView>
        </View>
    )
}

export default RoutingBetweenTwoPlaces
