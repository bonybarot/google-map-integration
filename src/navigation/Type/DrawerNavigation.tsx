import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import 'react-native-gesture-handler';
import { SCREENS } from '../NavigationKeys';
import BottomTabNavigation from './BottomTabNavigation';
import CustomDrawerContent from './CustomDrawerContent';

const DrawerNavigation = () => {
  const AppDrawer = createDrawerNavigator();
  // const { userData } = useAppSelector(authSelector);
  // if (!userData) {
  //   navigation.navigate(SCREENS.Auth);
  //   return null;
  // }
  return (
    <>
      <AppDrawer.Navigator
        initialRouteName={SCREENS.BottomTab}
        useLegacyImplementation={false}
        screenOptions={() => {
          return {
            headerShown: false,
          };
        }}
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
        <AppDrawer.Screen
          name={SCREENS.BottomTab}
          component={BottomTabNavigation}
          options={{
            drawerLabel: 'Home',
          }}
        />
      </AppDrawer.Navigator>
    </>
  );
};
export default DrawerNavigation;
