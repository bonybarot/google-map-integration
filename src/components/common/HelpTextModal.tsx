import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import strings from '@i18n/strings';

const HelpTextModal = (props: {
  visible: boolean;
  onDismiss: () => void;
  helpText: string;
}) => {
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
            <Text style={{ color: 'grey', fontSize: 18 }}>HelpText</Text>
            <TouchableOpacity onPress={props.onDismiss}>
              <EvilIcons name="close" color="grey" size={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <Text style={{ color: '#000000' }}>{props.helpText}</Text>
          <View
            style={{
              borderBottomColor: 'grey',
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
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default HelpTextModal;
