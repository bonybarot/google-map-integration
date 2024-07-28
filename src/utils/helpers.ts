import AsyncStorage from '@react-native-async-storage/async-storage';
import { languages } from './constant';
import strings from '../i18n/strings';
import { IRooms } from '../interfaces/hotel';
import { IReview } from '../interfaces/review';
import { PermissionsAndroid, Platform } from 'react-native';

// Set Async Storage Data
export const setAsyncStorageData = async (key: string, value: any) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

// Get Async Storage Data
export const getAsyncStorageData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data!);
};

export const addQueryParamsToUrl = (url: string, params: any) => {
  let newUrl: string = url;
  let addedAnyOne = false;
  Object.keys(params).forEach((e: string) => {
    if (params[e]) {
      if (addedAnyOne) {
        newUrl = `${newUrl}&${e}=${params[e]}`;
      } else {
        newUrl = `${newUrl}/?${e}=${params[e]}`;
        addedAnyOne = true;
      }
    }
  });
  return newUrl;
};

export const getCurrentLanguageName = () => {
  return languages.find(e => e.value === strings.getLanguage())?.name;
};
export const toNumber = (x: any) => {
  if (x !== '' && x !== null && x !== undefined && !isNaN(parseFloat(x))) {
    return x;
  }
  if (x === '' || x === null || x === undefined) {
    return x;
  }
  if (x === '-') {
    return '-';
  }
  return '';
};
export const getKeyByKey = (
  data: any[],
  value: any,
  valueKey: string,
  getKey: string,
) => {
  if (value) {
    if (data.length > 0) {
      const isExist = data.find((e: any) => e[valueKey] === value);
      if (isExist) {
        return isExist[getKey];
      }
      return value;
    }
    return value;
  }
  return '';
};

export const getMinPrice = (rooms: IRooms[]) => {
  const minimumPrice = rooms.reduce((minPrice, product) => {
    return parseFloat(product.price) < minPrice
      ? parseFloat(product.price)
      : minPrice;
  }, Infinity);
  return minimumPrice;
};

export const getRating = (reviews: IReview[]) => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  let totalRating = 0;
  reviews.forEach(e => {
    totalRating = totalRating + e.rating;
  });
  return totalRating / reviews.length;
};

export const hasAndroidPermission = async () => {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
};

export const getPenaltyCharge = (amount: string | number) => {
  const newAmount = parseFloat(amount.toString());
  if (newAmount > 0) {
    return (newAmount * 8) / 100;
  }
  return 0;
};

export const getNewIdOfTable = (realm: Realm, Model: any): number => {
  const modelData = Model.all(realm);
  if (modelData.length > 0) {
    return modelData[modelData.length - 1].id + 1;
  }
  return 1;
};

export const executeNotification = async (payload: any) => {
  try {
    const { action } = payload;
    switch (action) {
      case 'add':
        break;
      case 'update':
        break;
      case 'remove':
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

export const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const getFileNameFromUrl = (url: string) => {
  if (url && url.length > 0) {
    return url.split('/').pop();
  }
  return '';
};
