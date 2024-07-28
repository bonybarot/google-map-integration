import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';

const CrossButton = () => {
  const colors = useAppSelector(state => state.theme.current);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[localStyles.menuIcon, { backgroundColor: colors.new_primary }]}
      onPress={() => navigation.goBack()}>
      <Ionicons name="close-outline" size={moderateScale(30)} color="white" />
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  menuIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CrossButton;
