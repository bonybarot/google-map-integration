// Libraries import
import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

// Local import
import images from '../../assets/images';
import { getHeight, moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';
import { commonColor, styles } from '../../themes';
import EButton from '../common/EButton';
import EText from '../common/EText';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';

const SuccessModal = props => {
  const colors = useAppSelector(themeSelector).current;
  const {
    visible,
    onPressModalClose,
    btnText1 = 'Go Back To Home',
    btnText2 = false,
    // onPressBtn1,
    onPressBtn2,
    headerTitle,
    // subTitle,
    itemImage,
  } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity
        style={localStyles.modalMainContainer}
        activeOpacity={1}
        onPress={onPressModalClose}>
        <TouchableOpacity
          activeOpacity={1}
          style={[localStyles.root, { backgroundColor: colors.inputBg }]}>
          {itemImage ? (
            itemImage
          ) : colors.value === 'dark' ? (
            <Image
              source={images.SuccessModalImage}
              style={styles.selfCenter}
            />
          ) : (
            <Image
              source={images.SuccessModalImage}
              style={styles.selfCenter}
            />
          )}
          <EText
            type={'b22'}
            color={colors.new_primary}
            align={'center'}
            style={styles.mt25}>
            {headerTitle ? headerTitle : strings.paymentSuccessfull}
          </EText>
          <EText type={'r14'} align={'center'} style={styles.mt25}>
            {/* {!!subTitle ? subTitle : strings.modalDesc} */}
            Thank You! You Payment is Complete
          </EText>
          {!!btnText1 && (
            <EButton
              title={btnText1}
              type={'S14'}
              containerStyle={localStyles.signBtnContainer}
              onPress={onPressModalClose}
              bgColor={'#C6E8E6'}
              color="#008079"
            />
          )}
          {!!btnText2 && (
            <EButton
              title={btnText2}
              type={'S14'}
              color={colors.primary5}
              bgColor={colors.dark3}
              containerStyle={localStyles.signBtnContainer}
              onPress={onPressBtn2}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.p30,
    ...styles.mh30,
    borderRadius: moderateScale(15),
  },
  modalMainContainer: {
    ...styles.flex,
    ...styles.center,
    backgroundColor: commonColor.modalBg,
  },
  signBtnContainer: {
    ...styles.mt25,
    backgroundColor: '#C6E8E6',
    height: getHeight(60),
    borderRadius: moderateScale(22),
    width: moderateScale(190),
    ...styles.selfCenter,
  },
});

export default SuccessModal;
