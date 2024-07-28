import { INavigation } from '@interfaces/common';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useAppSelector } from '../../store';

const MenuButton = ({ navigation }: INavigation) => {
  const colors = useAppSelector(state => state.theme.current);
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Feather name={'menu'} size={30} color={colors.black} />
    </TouchableOpacity>
  );
};

export default MenuButton;
