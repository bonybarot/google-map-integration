import { TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../common/constants';
import { SCREENS } from '../../navigation/NavigationKeys';
import { INavigation } from '../../interfaces/common';

const NotificationButton = ({ navigation }: INavigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.Notifications)}>
      <Ionicons
        name="notifications-outline"
        size={moderateScale(30)}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default NotificationButton;
