import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import ESafeAreaView from './components/common/ESafeAreaView';
import AppNavigator from './navigation';
import store, { useAppSelector } from './store';
import { themeSelector } from './store/reducers/theme.reducer';
import { styles } from './themes';
import { realmContext } from './db';
import messaging from '@react-native-firebase/messaging';
import { executeNotification } from './utils/helpers';
import { setDeviceToken } from './store/reducers/auth.reducer';
import notifee from '@notifee/react-native';
import { Provider } from 'react-redux';
// import { Notification } from './db/schemas/notification.model';

const RNRoot = () => {
  const { RealmProvider } = realmContext;
  return (
    <Provider store={store}>
      <RealmProvider fallback={() => <ActivityIndicator size="large" />}>
        <App />
      </RealmProvider>
    </Provider>
  );
};

const App = () => {
  const { current: colors } = useAppSelector(themeSelector);

  const { useRealm } = realmContext;
  const realm = useRealm();

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: ToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.new_primary }}
        text1NumberOfLines={3}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: colors.redColor }}
        text1NumberOfLines={3}
      />
    ),
  };

  useEffect(() => {
    onDisplayNotification().then(token => {
      store.dispatch(setDeviceToken(token));
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(`notifee notification received1`, remoteMessage);
      // await Notification.create(
      //   {
      //     title: remoteMessage.notification?.title!,
      //     body: remoteMessage.notification?.body!,
      //     time: new Date(),
      //   },
      //   realm,
      // );
      executeNotification(remoteMessage.data);
      notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
      });
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(`notifee notification received2`, remoteMessage);
      executeNotification(remoteMessage.data);
      notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
      });

      // await Notification.create(
      //   {
      //     title: remoteMessage.notification?.title!,
      //     body: remoteMessage.notification?.body!,
      //   },
      //   realm,
      // );
    });

    return unsubscribe;
  }, []);

  const onDisplayNotification = (): Promise<string> =>
    new Promise(async (resolve, reject) => {
      if (messaging.AuthorizationStatus) {
        const token = await messaging().getToken();
        console.log('-----------token', token);
        resolve(token);
      } else {
        console.log('User declined permissions');
        reject('Permission Denied');
      }
    });

  return (
    <ESafeAreaView style={styles.flex}>
      <StatusBar
        barStyle={colors.value === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
      <Toast position="bottom" bottomOffset={20} config={toastConfig} />
    </ESafeAreaView>
  );
};

export default RNRoot;
