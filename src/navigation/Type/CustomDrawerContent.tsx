import EText from '@commonComponents/EText';
import strings from '@i18n/strings';
import { INavigation } from '@interfaces/common';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { themeSelector } from '@reducers/theme.reducer';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import { moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';
import { commonColor, styles } from '../../themes';
import { SCREENS, TabNav } from '../NavigationKeys';

const CustomDrawerContent = (props: INavigation) => {
  const { current } = useAppSelector(themeSelector);
  const [expanded, setExpanded] = React.useState<string>('');
  const menu = [
    {
      name: strings.profile,
      route: TabNav.ProfileTab,
      img: <FontAwesome size={22} name={'user-circle-o'} />,
    },
    {
      name: "Location",
      route: SCREENS.LocationTesting,
      img: <FontAwesome size={22} name={'user-circle-o'} />,
    },
    {
      name: "Background Location",
      route: SCREENS.BackgroundTesting,
      img: <FontAwesome size={22} name={'user-circle-o'} />,
    },
    {
      name: strings.logOut,
      route: TabNav.HomeTab,
      img: <MaterialIcons size={22} name={'logout'} color={'red'} />,
    },
  ];
  const CloseIcon = () => {
    return <Feather name="x" color={'black'} size={moderateScale(20)} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ marginTop: 10, marginHorizontal: 10 }}
          onPress={() => props.navigation.closeDrawer()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <Image
            source={
              current.value === 'dark' ? images.userDark : images.userLight
            }
            style={{
              ...localStyles.userImage,
              borderColor: 'gray',
            }}
          />
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <EText
              type="b16"
              style={{
                marginHorizontal: 10,
              }}>
              {'firstName'}
            </EText>
            <EText
              type="m12"
              style={{
                ...styles.selfCenter,
                marginHorizontal: 10,
                color: 'gray',
              }}
              numberOfLines={1}>{`${'userName'}`}</EText>
          </View>
        </View>
        {menu.map(e => {
          return (
            <React.Fragment>
              <TouchableOpacity
                onPress={async () => {
                  if (e.subRoute) {
                    if (expanded === e.name) {
                      setExpanded('');
                    } else {
                      setExpanded(e.name);
                    }
                  } else {
                    if (e.name === 'Logout') {
                      // dispatch(socketActions.disconnect());
                      // await dispatch(logout());
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: SCREENS.Auth }],
                      });

                      globalThis.realm.write(() => {
                        globalThis.realm.deleteAll();
                      });
                    } else {
                      props.navigation.navigate(e.route);
                    }
                  }
                }}
                style={{
                  flexDirection: 'row',
                  height: 52,
                  alignItems: 'center',
                }}>
                <View style={{ marginHorizontal: 10 }}>
                  <EText>{e.img}</EText>
                </View>
                <EText type="m14" style={{ flex: 1, marginLeft: 10 }}>
                  {e.name}
                </EText>
              </TouchableOpacity>
              {e.subRoute && e.subRoute.length > 0 && expanded === e.name && (
                <React.Fragment>
                  <View
                    style={{
                      height: 1,
                      marginHorizontal: 5,
                      backgroundColor: commonColor.divider,
                    }}
                  />
                  {e.subRoute.map((i, index) => {
                    return (
                      <View style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate(i.route);
                          }}
                          style={{
                            flexDirection: 'row',
                            height: 50,
                            paddingLeft: 10,
                            alignItems: 'center',
                          }}>
                          <EText type="r16" style={{ flex: 1, marginLeft: 10 }}>
                            {i.name}
                          </EText>
                          <View style={{ marginHorizontal: 10 }}>
                            <Ionicons
                              name="chevron-forward-outline"
                              size={moderateScale(20)}
                              color={'black'}
                            />
                          </View>
                        </TouchableOpacity>
                        {index < e.subRoute.length - 1 && (
                          <View
                            style={{
                              height: 0.5,
                              marginHorizontal: 5,
                              backgroundColor: commonColor.divider,
                            }}
                          />
                        )}
                      </View>
                    );
                  })}
                </React.Fragment>
              )}
              <View
                style={{
                  height: 1,
                  marginHorizontal: 5,
                  backgroundColor: commonColor.divider,
                }}
              />
            </React.Fragment>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  LogOutButtonContainer: {
    ...styles.selfCenter,
    height: 40,
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    width: 150,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FE7765',
  },
  userImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    marginVertical: 10,
  },
});
export default CustomDrawerContent;
