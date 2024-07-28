import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EText from './EText';
const CommingSoonModal = (props: any) => {
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
            <EText type="b16">Coming Soon</EText>
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
            Stay tuned. We are launching soon.
          </Text>
          <View
            style={{
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          {/* <View
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
            <EButton
              style={{ textAlign: 'center', paddingHorizontal: 10 }}
              title={strings.Confirm}
              height={30}
              type={'S16'}
              onPress={props.onPress}
              bgColor={current.redColor}
            />
          </View> */}
        </View>
      </Modal>
    </View>
  );
};
export default CommingSoonModal;
