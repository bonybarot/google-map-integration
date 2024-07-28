// Library Imports
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import SuccessModal from '../../components/Modals/SuccessModal';

const NoFoundEmailModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onPressModalClose = () => setModalVisible(false);
  return (
    <SuccessModal
      visible={modalVisible}
      onPressModalClose={onPressModalClose}
      itemImage={isWallet ? isPaymentModal : isOrderModal}
      headerTitle={
        isWallet ? strings.orderSuccessful : strings.congratulations
      }
      subTitle={isWallet ? strings.orderDesc : strings.topUpDesc}
      btnText1={isWallet ? strings.viewOrder : strings.viewETicket}
      btnText2={isWallet ? strings.viewEReceipt : strings.cancel}
      onPressBtn1={isWallet ? onPressViewOrder : onPressETicket}
      onPressBtn2={isWallet ? onPressERiceipt : onPressModalClose}
    />
  );

}



export default NoFoundEmailModal;
