// Library Imports
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';

// Local Imports
// import ESafeAreaView from '@commonComponents/ESafeAreaView';
import ELoader from '@commonComponents/Eloader';
import { SCREENS } from '@navigation/NavigationKeys';
import { setDefaultEmailPassword, whoAmI } from '@reducers/auth.reducer';
import { socketActions } from '@reducers/socketReducer';
import { changeThemeAction } from '@reducers/theme.reducer';
import { colors, styles } from '../../themes';
import { initialStorageValueGet } from '@utils/asyncstorage';
import { INavigation } from '@interfaces/common';
import ESafeAreaView from '@commonComponents/ESafeAreaView';

const Splash = ({ navigation }: INavigation) => {
  const dispatch = useDispatch();
  const asyncProcess = async () => {
    try {
      let asyncData = await initialStorageValueGet();
      if (asyncData) {
        let { themeColor, loggedIn, logInCred } = asyncData;
        if (logInCred) {
          dispatch(setDefaultEmailPassword(logInCred));
        }

        if (themeColor) {
          if (themeColor === 'light') {
            dispatch(changeThemeAction(colors.light));
          } else {
            dispatch(changeThemeAction(colors.dark));
          }
        }
        if (loggedIn) {
          const { payload } = await dispatch(whoAmI());
          if (payload.status) {
            dispatch(socketActions.startConnecting());
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.Drawer,
                },
              ],
            });
          } else {
            navigation.navigate(SCREENS.LocationTesting);
          }
        } else {
          navigation.navigate(SCREENS.Drawer);
        }

      } else {
        navigation.navigate(SCREENS.onBoarding);
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    asyncProcess();
  }, []);

  return (
    <ESafeAreaView style={localStyles.container}>
      <ELoader loading={true} mode="button" size="medium" />
    </ESafeAreaView>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
