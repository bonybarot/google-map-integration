import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import FormInput from '../fields/FormInput';
import EButton from './EButton';
import EHeader from './EHeader';
import EText from './EText';
interface ISelectDate {
  check_in_date: Date;
  check_out_date: Date;
}
const AvailabilityModal = (props: any) => {
  const colors = useAppSelector(state => state.theme.current);
  const { control } = useForm<ISelectDate>({
    defaultValues: { date: new Date() },
    mode: 'onChange',
  });
  return (
    <View>
      <Modal isVisible={props.visible} onDismiss={props.onDismiss}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
          }}>
          <View>
            <EHeader />
            {/* <TouchableOpacity onPress={props.onDismiss}>
              <EvilIcons name="close" color="grey" size={24} />
            </TouchableOpacity> */}
            <EText type="b16">{'My Availablity'}</EText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <View style={{ flex: 1 }}>
                <FormInput
                  control={control}
                  label={strings.selectDate}
                  name="date"
                  required={true}
                  minimumDate={new Date()}
                  type="MonthAndDay"
                  placeholder={strings.date}
                  keyBoardType={'default'}
                />
              </View>
            </View>
            <EText type="b16">{'Available Slot'}</EText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <View style={{ flex: 1 }}>
                <FormInput
                  control={control}
                  label={strings.startTime}
                  name="start_time"
                  required={true}
                  type="time"
                  placeholder={strings.date}
                  keyBoardType={'default'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  control={control}
                  label={strings.endTime}
                  name="end_time"
                  type="time"
                  required={true}
                  placeholder={strings.date}
                  keyBoardType={'default'}
                />
              </View>
            </View>
            <EButton
              // onPress={handleSubmit(onSubmit, onError)}
              title={strings.save}
              type={'S16'}
              bgColor={colors.new_primary}
              // disabled={isSubmitDisabled}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AvailabilityModal;
