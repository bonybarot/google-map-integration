
import EButton from '@commonComponents/EButton';
import EText from '@commonComponents/EText';
import FormInput from '@fields/FormInput';
import { INavigation } from '@interfaces/common.ts';
import { SCREENS } from '@navigation/NavigationKeys.tsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PermissionsAndroid, ScrollView, View } from 'react-native';
import GetLocation from 'react-native-get-location';

const LocationTesting = ({ navigation }: INavigation) => {
  const { control, handleSubmit, setValue } = useForm({});

  const onLocationChange = (location: any) => {
    setValue('latitude', location.geometry.location.lat);
    setValue('longitude', location.geometry.location.lng);
  };
  const onLocationChange1 = (location: any) => {
    setValue('latitude1', location.geometry.location.lat);
    setValue('longitude1', location.geometry.location.lng);
  };
  const onLocationChange2 = (location: any) => {
    setValue('latitude2', location.geometry.location.lat);
    setValue('longitude2', location.geometry.location.lng);
  };
  const onLocationChange3 = (location: any) => {
    setValue('latitude3', location.geometry.location.lat);
    setValue('longitude3', location.geometry.location.lng);
  };

  const onSubmit = (FormData: any) => {
    console.log(FormData, "-----FormData-----");
    navigation.navigate(SCREENS.GoogleMapView, { SelectedPlace: FormData });
  };
  const onFindDistance = (FormData: any) => {
    console.log(FormData, "-----FormData-----");
    navigation.navigate(SCREENS.RoutingBetweenTwoPlaces, { SelectedPlaces: FormData });
  };
  const onLocateToPlace = (FormData: any) => {
    console.log(FormData, "-----FormData-----");
    navigation.navigate(SCREENS.LocateToThePlaces, { SelectedPlace: FormData });
  };

  const onError = (err: any) => console.log("err----", err);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
        navigation.navigate(SCREENS.GoogleMapView, { SelectedPlace: location });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View>
      <ScrollView>
        <FormInput
          control={control}
          label={'Address'}
          name={'address'}
          placeholder={'Address'}
          keyBoardType={'default'}
          type="location"
          onValueChange={onLocationChange}
        />
        <EButton title='Open Map' onPress={handleSubmit(onSubmit, onError)} />
        <EButton title='Request location' onPress={handleSubmit(requestLocationPermission, onError)} />
        <EButton title='Get current location' onPress={handleSubmit(getCurrentLocation, onError)} />
        <EText>Find Distance between two place</EText>
        <FormInput
          control={control}
          label={'Address 1'}
          name={'address1'}
          placeholder={'Address'}
          type="location"
          onValueChange={onLocationChange1}
        />
        <FormInput
          control={control}
          label={'Address 2'}
          name={'address2'}
          placeholder={'Address'}
          type="location"
          onValueChange={onLocationChange2}
        />
        <EButton title='Open Map' onPress={handleSubmit(onFindDistance, onError)} />
        <FormInput
          control={control}
          label={'Address 3'}
          name={'address3'}
          placeholder={'Address'}
          type="location"
          onValueChange={onLocationChange3}
        />
        <EButton title='Locate To The Place' onPress={handleSubmit(onLocateToPlace, onError)} />
      </ScrollView>
    </View>
  );
};

export default LocationTesting;
