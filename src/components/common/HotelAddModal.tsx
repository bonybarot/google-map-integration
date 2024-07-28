// Libraries import
import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

// Local import
// import { styles } from '../../themes';
import { View } from 'react-native';
import images from '../../assets/images';
import { getHeight, moderateScale } from '../../common/constants';
import EButton from '../../components/common/EButton';
import EText from '../../components/common/EText';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { commonColor, styles } from '../../themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import EText from '../common/EText';

const HotelAddModal = (props: any) => {
  const colors = useAppSelector(themeSelector).current;
  const { visible } = props;

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={localStyles.modalMainContainer}>
        <View
          style={[
            localStyles.root,
            {
              backgroundColor: colors.new_primary,
            },
          ]}>
          <TouchableOpacity
            style={{
              paddingTop: 10,
              paddingRight: 10,
              alignItems: 'flex-end',
            }}
            onPress={props.onDismiss}>
            <AntDesign name={'closecircleo'} size={22} color={'white'} />
          </TouchableOpacity>
          <Image
            source={images.popUpOfSubscriptioPageimg}
            style={localStyles.imageStyle}
          />

          <EText
            align={'center'}
            type="r20"
            color={colors.white}
            style={{
              ...styles.mt10,
            }}>
            {strings.thankYouSentence}
          </EText>
          <EButton
            title={strings.ok}
            type={'S16'}
            containerStyle={localStyles.signBtnContainer}
            onPress={props.onPress}
            bgColor={'white'}
            color={colors.new_primary}
          />
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  root: {
    // ...styles.p30,
    // ...styles.mh30,
    margin: 50,
    borderRadius: moderateScale(15),
  },
  modalMainContainer: {
    ...styles.flex,
    justifyContent: 'center',
    backgroundColor: commonColor.modalBg,
  },

  imageStyle: {
    height: 50,
    width: 60,
    alignSelf: 'center',
    margin: 20,
  },
  signBtnContainer: {
    height: getHeight(60),
    width: 190,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: moderateScale(10),
  },
  container: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCell: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
  },
  cellText: {
    fontSize: 16,
    color: 'white',
  },
  cell: {
    fontSize: 16,
    flex: 1,
    borderColor: '#ccc',
    color: 'white',
    paddingHorizontal: 10,
    borderWidth: 1,
    padding: 5,
  },
});

export default HotelAddModal;
