import EButton from '@commonComponents/EButton';
import { AgentIcon, CallOutText } from '@commonComponents/MapIcons';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PermissionsAndroid, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { getCurrentLocation, openAppSettings, RequestBackgroundLocation, requestLocationPermission } from 'src/common/constants';

const BackgroundTesting = () => {
    const { handleSubmit } = useForm({});
    const [currentLocation, setCurrentLocation] = useState();
    const [region, setRegion] = useState<Region>({
        latitude: 23.046129737637894,
        longitude: 72.56931602954866,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    const requestBackgroundPermission = async () => {
        console.log("function called")
        const locationGranted = await requestLocationPermission()
        const backgroundGranted = await RequestBackgroundLocation()
        console.log("locationGranted", locationGranted, "-backgroundGranted----", backgroundGranted);
        if (locationGranted && backgroundGranted) {
            console.log("ReactNativeForegroundService-----", ReactNativeForegroundService.stop({ id: 144 }))
            ReactNativeForegroundService.add_task(
                async () => {
                    try {
                        const Location = await getCurrentLocation()
                        console.log("---Location-----", Location)
                        setCurrentLocation(Location);
                        if (!Location) {
                            console.log('No permissions to obtain location');
                        }
                    } catch (error) {
                        console.error('Permission request error:', error);
                    }
                },
                {
                    delay: 10000,
                    onLoop: true,
                    taskId: 'taskid',
                    onError: (e) => console.log('Error logging:', e),
                }
            );

            ReactNativeForegroundService.start({
                id: 144,
                title: 'Foreground Service',
                message: 'We are tracking your location',
            });
        } else {
            const locationGranted = await requestLocationPermission()
            const backgroundGranted = await RequestBackgroundLocation()
            if (!backgroundGranted && !locationGranted) {

                //             openAppSettings()
                Alert.alert(
                    'Permission Required',
                    'You have to give permission to track location.',
                    [
                        {
                            text: 'Go to Settings',
                            onPress: openAppSettings,
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    };


    const onError = (err: any) => console.log("err:", err);

    useEffect(() => {
        requestBackgroundPermission();
    }, []);

    const handleUpdateRegion = () => {
        if (currentLocation) {
            setRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>Background Location Testing</Text>
            <EButton title='background permission' onPress={handleSubmit(requestBackgroundPermission, onError)} />
            {/* {currentLocation && */}
            <View style={{ flex: 1, }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    region={region}
                >
                    <Marker
                        coordinate={{
                            latitude: currentLocation?.latitude,
                            longitude: currentLocation?.longitude,
                            // latitude: currentLocation?.latitude ?? "37.4220936",
                            // longitude: currentLocation?.longitude ?? "-122.083922",
                        }}
                        title='My Location'
                        description='I am here'
                    >
                        <AgentIcon />
                        <Callout style={{ height: 100, width: 200, borderWidth: 1 }}>
                            <CallOutText title={"this is my call out text"} />
                        </Callout>
                    </Marker>
                </MapView>
                {/* Button to update the map region */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        right: 30,
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 5,
                        elevation: 5
                    }}
                    onPress={handleUpdateRegion}
                >
                    {/* <Text style={{ color: 'white' }}>Find Agent</Text> */}
                    <Ionicons name="locate" color="blue" size={30} />
                </TouchableOpacity>
            </View>
            {/* } */}
        </View>
    );
};

export default BackgroundTesting;
