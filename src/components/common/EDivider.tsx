import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
// Custom Imports
import { moderateScale } from '../../common/constants';
import { styles } from '../../themes';
import { useAppSelector } from '../../store';

const EDivider = ({ style }) => {
  const colors = useAppSelector(state => state.theme.current);
  return (
    <View
      style={[
        localStyles.divider,
        {
          backgroundColor:
            colors.value === 'dark' ? colors.grayScale8 : colors.grayScale3,
        },
        style,
      ]}
    />
  );
};

const localStyles = StyleSheet.create({
  divider: {
    height: moderateScale(1),
    ...styles.mv10,
  },
});

export default memo(EDivider);
