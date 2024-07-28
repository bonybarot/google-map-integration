import React, { useEffect, useState } from 'react';
import { View, Button, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-toast-message';
import strings from '../../i18n/strings';
import { INavigation } from '../../interfaces/common';
import { mapKey } from '../../utils/constant';
import EHeader from './EHeader';
import { colors, styles } from '@themes/index';
import { moderateScale } from 'src/common/constants';
import EText from './EText';
import Entypo from 'react-native-vector-icons/Entypo'
import ELoader from './Eloader';

const AddressPicker = ({ navigation }: INavigation) => {
  const route = useRoute();
  const [loading, setLoading] = useState<boolean>(false)
  const { onPress } = route?.params;
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        Toast.show({ type: 'error', text1: 'Location permission denied' });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapKey}`
      );
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        return json.results[0];
      } else {
        throw new Error('No address found');
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Failed to fetch address details' });
      return null;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true)
    try {
      requestLocationPermission()
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      const { latitude, longitude } = location;
      const addressDetails = await reverseGeocode(latitude, longitude);
      if (addressDetails) {
        onPress(addressDetails);
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: error.message });
    }
    setLoading(false)
  };

  return (
    <View style={{ flex: 1 }}>
      <EHeader title={strings.addressPicker} />
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder={strings.enterAddress}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('details------', details);
            onPress(details);
            navigation.goBack();
          }}
          query={{
            key: mapKey,
            language: strings.getLanguage(),
          }}
          styles={{
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              ...styles.shadowStyle1,
              margin: moderateScale(5)
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: { color: 'black', zIndex: 100000 },
            description: { color: 'gray' },
          }}
        />
        <TouchableOpacity onPress={getCurrentLocation} style={{ borderWidth: 1, margin: moderateScale(20), flexDirection: "row", height: moderateScale(40), borderRadius: 5, backgroundColor: colors.light.grayScale1, borderColor: "gray" }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>

              <ELoader loading={true} size='small' />
            </View>
          ) : (
            <>

              <Entypo name="location-pin" color={"#5c81ed"} size={moderateScale(20)} style={{ marginHorizontal: 20, marginRight: -20, alignSelf: "center" }} />
              {/* <Button title="Use Current Location"  /> */}
              <EText type='m14' style={{ textAlign: "center", flex: 1, verticalAlign: "middle" }}> Use Current Location</EText>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressPicker;
