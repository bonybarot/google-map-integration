import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import { styles } from '../../themes';
import EText from './EText';
import { moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';

interface IHeader {
  title?: string;
  onPressBack?: () => void;
  rightIcon?: ReactElement;
  isHideBack?: boolean;
  isLeftIcon?: ReactElement;
  backColor?: string;
}

const EHeader = (props: IHeader) => {
  const { title, onPressBack, rightIcon, isHideBack, isLeftIcon } = props;
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.current);

  const goBack = () => navigation.goBack();
  return (
    <View
      style={[
        localStyles.container,
        !!isHideBack && styles.pr10,
        {
          backgroundColor: props.backColor ?? 'white',
        },
      ]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity
            style={[
              localStyles.backIcon,
              // { backgroundColor: colors.new_primary },
            ]}
            onPress={onPressBack || goBack}>
            <Ionicons
              name="chevron-back-outline"
              size={moderateScale(22)}
              color={colors.black}
            />
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}
        {title && (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <EText
              numberOfLines={1}
              style={{ ...styles.pr10, ...styles.mh10 }}
              type={'B22'}>
              {title}
            </EText>
          </View>
        )}
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default memo(EHeader);

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph10,
    ...styles.pv15,
    ...styles.center,
  },
  backIcon: {
    height: 30,
    width: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
});
