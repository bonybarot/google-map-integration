import EHeader from '@commonComponents/EHeader';
import { AgentIcon, CallOutText } from '@commonComponents/MapIcons';
import { INavigation } from '@interfaces/common';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PermissionsAndroid, View } from 'react-native';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Toast from 'react-native-toast-message';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import EButton from '@commonComponents/EButton';

const GoogleMapView = ({ navigation }: INavigation) => {
  const { control, } = useForm({});
  const mapRef = useRef(null)
  const route = useRoute()
  const { SelectedPlace } = route?.params
  console.log("SelectedPlace-----------", SelectedPlace)
  const locationList = [
    {
      latitude: "23.04694422198107",
      longitude: "72.56839871406557"
    },
    {
      latitude: "23.047028138269866",
      longitude: "72.57037281990053"
    }
  ]
  // const MoveToSelectedLocation = () => {
  // mapRef.current.animateToRigion(
  //   {
  //     latitude: SelectedPlace.latitude,
  //     longitude: SelectedPlace.longitude,
  //   }, 2000
  // )
  // }
  // MoveToSelectedLocation()
  return (
    <View style={{ flex: 1 }}>
      <EHeader title='map' />
      <MapView
        // ref={mapRef}
        mapType="hybrid"
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: parseFloat("23.047028138269866"),
          longitude: parseFloat("72.57037281990053"),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          draggable
          coordinate={{
            latitude: parseFloat("23.046129737637894"),
            longitude: parseFloat("72.56931602954866"),
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

        {/* multiple location markers */}
        {locationList.map((item) => {
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}
              title='My Location'
              description='I am here'
            />
          )
        })}
        {/* <Circle
          center={{
            latitude: parseFloat("23.046129737637894"),
            longitude: parseFloat("72.56931602954866"),
          }}
          radius={200}
          fillColor='#F1F5F8'
          strokeColor='gray'

        /> */}
        {/* marker set using searched location */}
        {/* <Marker
          draggable
          coordinate={{
            latitude: parseFloat(SelectedPlace?.latitude),
            longitude: parseFloat(SelectedPlace?.longitude),
            // latitude: parseFloat("23.046129737637894"),
            // longitude: parseFloat("72.56931602954866"),
          }}
          title='My Location'
          description='I am here'
        /> */}
        {/* <EButton title='dsfsdf' /> */}
      </MapView>
    </View>
  )
}

export default GoogleMapView
