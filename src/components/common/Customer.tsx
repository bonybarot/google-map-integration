//Library Imports
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
//Local Imports
import images from '../../assets/images';
import { getHeight, moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { styles } from '../../themes';
import EText from './EText';

export default function Customer({
  containerStyle,
  bgColor = null,
  onpressCustomer,
  ...props
}) {
  const colors = useAppSelector(state => state.theme.current);
  return (
    <View
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? { backgroundColor: bgColor }
          : { backgroundColor: colors.primary5 },
      ]}
      {...props}>
      <TouchableOpacity onPress={onpressCustomer}>
        <Image
          source={images.customerImg}
          resizeMode="contain"
          style={localStyle.imageContainer}
        />

        <EText type={'b20'} style={localStyle.textOfService}>
          {strings.customer}
        </EText>
      </TouchableOpacity>
    </View>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    ...styles.selfCenter,
    height: getHeight(290),
    width: getHeight(290),
    borderRadius: moderateScale(10) / 2,
  },
  imageContainer: {
    ...styles.mb50,
    ...styles.selfCenter,
    height: getHeight(150),
    width: getHeight(250),
  },
  textOfService: {
    ...styles.selfCenter,
    color: 'white',
  },
});
