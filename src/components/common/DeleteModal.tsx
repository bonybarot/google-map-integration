import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EButton from './EButton';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
const DeleteModal = (props: any) => {
  const { current } = useAppSelector(themeSelector);
  return (
    <View>
      <Modal isVisible={props.visible} onDismiss={props.onDismiss}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
          }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'red', fontSize: 18 }}>Delete</Text>
            <TouchableOpacity onPress={props.onDismiss}>
              <EvilIcons name="close" color="grey" size={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <Text style={{ color: 'grey' }}>
            {strings.AreyousureyouwanttoDelete}
          </Text>
          <View
            style={{
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={props.onDismiss}>
              <Text style={{ color: 'grey', fontSize: 18, marginRight: 10 }}>
                {strings.cancel}
              </Text>
            </TouchableOpacity>
            {/* <View style={{ flex: 1 }}> */}
            <EButton
              style={{ textAlign: 'center', paddingHorizontal: 10 }}
              title={strings.Confirm}
              height={30}
              type={'S16'}
              onPress={props.onPress}
              bgColor={current.redColor}
            />
            {/* </View> */}
            {/* <TouchableOpacity
              style={{ backgroundColor: '#FEE6EA', borderRadius: 12 }}
              onPress={props.onPress}>
              <Text style={{ color: 'red', fontSize: 18, padding: 5 }}>
                Confirm
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default DeleteModal;
