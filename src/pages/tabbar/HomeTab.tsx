import EHeader from '@commonComponents/EHeader';
import EText from '@commonComponents/EText';
import MenuButton from '@commonComponents/MenuButton';
import { INavigation } from '@interfaces/common';
import { SCREENS } from '@navigation/NavigationKeys';
import { useAppSelector } from '@store/index';
import { themeSelector } from '@store/reducers/theme.reducer';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from 'src/common/constants';

const HomeTab = ({ navigation }: INavigation) => {
  const { current } = useAppSelector(themeSelector);
  const menu = [
    {
      name: 'Total Collections',
    },
    {
      name: 'Total Allocation',
    },
    {
      name: 'Group Details',
    },
    {
      name: 'Payment Collected',
    },
    {
      name: 'Refused to Pay',
    },
    {
      name: 'PTP Reschedule',
    },
    {
      name: 'Already Paid',
    },
    {
      name: 'Not Available',
    },
    {
      name: 'Broken PTP',
    },
    {
      name: 'Rejected Cases',
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <EHeader
        isLeftIcon={<MenuButton navigation={navigation} />}
        isHideBack={true}
        title="Dashboard"
      />
      <FlatList
        data={menu}
        contentContainerStyle={{
          marginHorizontal: 8,
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(SCREENS.ListOfDataPage)}
              style={{
                height: moderateScale(65),
                // borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                elevation: 5,
                margin: 5,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name={'money'}
                  size={moderateScale(25)}
                  style={{
                    alignSelf: 'center',
                    color: current.new_primary,
                    flex: 1,
                    textAlign: 'center',
                  }}
                />
                <EText
                  type="b18"
                  color={current.new_primary}
                  style={{ flex: 3 }}>
                  {item.name}
                </EText>
              </View>
              <View
                style={{
                  padding: moderateScale(8),
                  // borderWidth: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#DCFBF1',
                  borderRadius: 5,
                }}>
                <EText type="b16" color={current.new_primary}>
                  50k
                </EText>
              </View>
              <MaterialCommunityIcons
                name={'greater-than'}
                size={moderateScale(25)}
                style={{
                  alignSelf: 'center',
                  color: current.new_primary,
                  margin: 5,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeTab;
