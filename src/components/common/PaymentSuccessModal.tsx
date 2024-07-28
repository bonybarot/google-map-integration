// Libraries import
import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

// Local import
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/images';
import { getHeight, moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';
import { SCREENS } from '../../navigation/NavigationKeys';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { commonColor, styles } from '../../themes';
import EButton from '../common/EButton';
import EText from '../common/EText';

const SuccessModal = props => {
  const colors = useAppSelector(themeSelector).current;
  const navigation = useNavigation();
  const ViewTicket = () => {
    setTimeout(() => {
      navigation.navigate(SCREENS.TicketGenerate);
    }, 100);
  };

  const {
    visible,
    onPressModalClose,
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
            {strings.Successfullymadepaymentandhotelbooking}
          </EText>

          <EButton
            title={'View Ticket'}
            type={'S14'}
            containerStyle={localStyles.signBtnContainer}
            onPress={ViewTicket}
            bgColor={'#008079'}
            color="#fff"
          />

          <EButton
            title={'Cancel'}
            type={'S14'}
            color={colors.new_primary}
            bgColor={'#DAF3F2'}
            containerStyle={localStyles.signBtnContainer}
            onPress={onPressModalClose}
          />
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
