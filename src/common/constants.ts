import { Alert, Dimensions, Linking, PermissionsAndroid, Platform } from 'react-native';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-toast-message';

//Device dimensions
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');
export const deviceWidth = viewportWidth;
export const deviceHeight = viewportHeight;

let sampleHeight = 926;
let sampleWidth = 428;

const scale = viewportWidth / 375;

//Device type check
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isTablet = viewportHeight / viewportWidth < 1.6;

export const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

//Responsive height and width function
export function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

//Get Width of Screen
export function getWidth(value) {
  return (value / sampleWidth) * deviceWidth;
}

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * deviceHeight;
}

//Responsive size function
export function moderateScale(size) {
  const newSize = size * scale;
  if (isTablet) {
    return Math.round(newSize) - wp(1);
  } else {
    return Math.round(newSize);
  }
}
//Get Background Permission
export async function RequestBackgroundLocation() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    if (
      granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true
    } else {
      return granted
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    if (
      granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true
    } else {
      return granted
    }
  } catch (err) {
    console.warn(err);
  }
};

// Get current location
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission is not granted');
    }

    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    return location;
  } catch (error) {
    console.warn('Error getting current location:', error);
    // Handle specific error cases if needed
  }
};
// Function to open app settings
export const openAppSettings = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};







//AsyncStorage keys
export const THEME = 'THEME';
export const LANGUAGE = 'LANGUAGE';
export const ON_BOARDING = 'ON_BOARDING';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_IN_CRED = 'LOG_IN_CRED';

