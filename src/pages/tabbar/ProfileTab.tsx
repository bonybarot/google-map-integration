import images from '@assets/images';
import EHeader from '@commonComponents/EHeader';
import EText from '@commonComponents/EText';
import { useAppSelector } from '@store/index';
import { themeSelector } from '@store/reducers/theme.reducer';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from 'src/common/constants';

const ProfileTab = () => {
  const { current } = useAppSelector(themeSelector);
  const menu = [
    {
      name: 'My Contact Info',
      icon: (
        <AntDesign
          name={'contacts'}
          size={moderateScale(25)}
          style={[localStyles.iconStyle, { color: current.new_primary }]}
        />
      ),
    },
    {
      name: 'Total Portfolio Assigned',
      icon: (
        <FontAwesome
          name={'money'}
          size={moderateScale(25)}
          style={[localStyles.iconStyle, { color: current.new_primary }]}
        />
      ),
    },
    {
      name: 'Total Collections Received',
      icon: (
        <FontAwesome
          name={'bank'}
          size={moderateScale(25)}
          style={[localStyles.iconStyle, { color: current.new_primary }]}
        />
      ),
    },
    {
      name: 'Organization Hirarchy',
      icon: (
        <FontAwesome
          name={'file-pdf-o'}
          size={moderateScale(25)}
          style={[localStyles.iconStyle, { color: current.new_primary }]}
        />
      ),
    },
    {
      name: 'Settings',
      icon: (
        <Fontisto
          name={'player-settings'}
          size={moderateScale(25)}
          style={[localStyles.iconStyle, { color: current.new_primary }]}
        />
      ),
    },
  ];
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <EHeader title="Profile" />
      <Image
        source={images.DemoProfile}
        style={{
          height: moderateScale(150),
          width: moderateScale(150),
          alignSelf: 'center',
          marginTop: moderateScale(20),
          borderRadius: moderateScale(150),
          borderWidth: 3,
          borderColor: current.grayScale3,
        }}
      />
      <EText
        type="b24"
        style={{
          textAlign: 'center',
          // borderWidth: 1,
          margin: moderateScale(10),
        }}>
        Aaryan Shah
      </EText>
      <View
        style={{
          borderWidth: 1,
          borderColor: current.grayScale3,
          alignSelf: 'center',
          backgroundColor: '#CBF5E8',
          paddingHorizontal: moderateScale(15),
          paddingVertical: 5,
          borderRadius: 5,
        }}>
        <EText type="b16" color={current.new_primary}>
          Agent
        </EText>
      </View>
      <FlatList
        data={menu}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(10),
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                // height: moderateScale(65),
                // borderWidth: 1,
                paddingVertical: moderateScale(15),
                borderRadius: 5,
                flexDirection: 'row',
                elevation: 5,
                marginVertical: moderateScale(6),
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                {/* <FontAwesome
                  name={'money'}
                  size={moderateScale(25)}
                  style={{
                    alignSelf: 'center',
                    color: current.new_primary,
                    flex: 1,
                    textAlign: 'center',
                  }}
                /> */}
                {item.icon}
                <EText
                  type="b18"
                  color={current.new_primary}
                  style={{ flex: 3.5 }}>
                  {item.name}
                </EText>
              </View>
              <MaterialCommunityIcons
                name={'greater-than'}
                size={moderateScale(25)}
                style={{
                  alignSelf: 'center',
                  color: current.new_primary,
                  marginRight: moderateScale(15),
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProfileTab;

const localStyles = StyleSheet.create({
  iconStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
