import { TabNav } from '@navigation/NavigationKeys';
import { TabRoute } from '@navigation/NavigationRoutes';
import { themeSelector } from '@reducers/theme.reducer';
import React from 'react';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAppSelector } from '../../store';

const Tab = AnimatedTabBarNavigator();

const BottomTab = () => {
  const { current } = useAppSelector(themeSelector);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: 200 },
        }}
        tabBarOptions={{
          tabBarItemStyle: { width: 200 },
          scrollEnabled: true,
          activeTintColor: current.new_primary, // Change the label color of active tab
          labelStyle: { fontSize: 14 }, // Adjust the font size of the label
          activeBackgroundColor: '#CCEAE5', // Change the background color of the active tab
        }}
        sceneContainerStyle={{ height: 50 }}>
        <Tab.Screen
          name={TabNav.HomeTab}
          component={TabRoute.HomeTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name={'home'}
                  size={25}
                  color={focused ? current.new_primary : 'gray'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={TabNav.ProfileTab}
          component={TabRoute.ProfileTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name={'user'}
                  size={25}
                  color={focused ? current.new_primary : 'gray'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTab;
