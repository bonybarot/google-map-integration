import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EText from '../common/EText';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { moderateScale } from '../../common/constants';

const CheckboxCommon = (props: any) => {
  const { current: colors } = useAppSelector(themeSelector);
  const { value, onChange, label, disabled, error } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => onChange(!value)}
        disabled={disabled}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name={!value ? 'square-outline' : 'checkbox'}
          size={moderateScale(23)}
          color={colors.new_primary}
        />
        <EText type={'s16'} style={{ color: 'gray', marginLeft: 10 }}>
          {label}
        </EText>
      </TouchableOpacity>
      {error && <Text style={{ color: colors.redColor }}>{error.message}</Text>}
    </View>
  );
};
export default CheckboxCommon;
