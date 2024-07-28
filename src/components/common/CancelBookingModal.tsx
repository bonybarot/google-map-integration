// Library import
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

// Local import
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { styles } from '../../themes';
import EButton from '../common/EButton';
import EDivider from '../common/EDivider';
import EText from '../common/EText';

const CancelBookingModal = props => {
  const { current: colors } = useAppSelector(themeSelector);
  const { SheetRef, onContinue } = props;
  // const colors = useSelector(state => state.theme.theme);

  const OnpressContinue = () => {
    SheetRef?.current?.hide();
    onContinue();
  };

  const onPressCancel = () => SheetRef?.current?.hide();

  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        backgroundColor:
          colors.value === 'dark' ? colors.dark3 : colors.grayScale3,
        ...styles.actionSheetIndicator,
      }}
      containerStyle={[
        localStyles.actionSheetContainer,
        { backgroundColor: colors.backgroundColor },
      ]}>
      <View style={localStyles.bottomContainer}>
        <EText
          type={'B22'}
          style={{ ...styles.mt5, color: '#CB1800' }}
          align={'center'}>
          {strings.cancelBooking}
        </EText>
        <EDivider style={styles.mv20} />
        <EText type={'b18'} align={'center'}>
          {/* {strings.areYouSure} */}
          Are You Sure You Want To Cancel Your Hotel Booking
        </EText>
        <EText
          type={'M16'}
          style={{ ...styles.mt15, color: 'gray' }}
          align={'center'}>
          {/* {strings.cancelBookingDesc} */}
          Only 92% of the money you can refund from your payment according to
          our policy
        </EText>
        <View style={localStyles.btnContainer}>
          <EButton
            // title={strings.noDonCancel}
            onPress={OnpressContinue}
            title={'Yes Continue'}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            // color={colors.value === 'dark' ? colors.white : colors.primary}
            bgColor={'#008079'}
          />
          <EButton
            title={strings.cancel}
            type={'S16'}
            bgColor={'#CCE6E4'}
            color={'#008079'}
            containerStyle={{ width: '45%' }}
            onPress={onPressCancel}
            // onPress={onPressLogOut}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.ph20,
  },
  btnContainer: {
    ...styles.pv30,
    marginVertical: 10,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  bottomContainer: {
    ...styles.pv10,
  },
});

export default CancelBookingModal;
