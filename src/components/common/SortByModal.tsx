// Libraries import
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

// Local import
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getHeight, moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { commonColor, styles } from '../../themes';
import EButton from '../common/EButton';
import EText from '../common/EText';

const SortByModal = props => {
  const colors = useAppSelector(themeSelector).current;
  const [cat, setcat] = useState('');
  const handlecat = e => {
    setcat(e);
  };
  const category = [
    {
      id: 1,
      name: 'Newest',
    },
    {
      id: 2,
      name: 'Price(low to high)',
    },
    {
      id: 3,
      name: 'Price(high to low)',
    },
    {
      id: 4,
      name: 'Size(Low to High)',
    },
    {
      id: 5,
      name: 'Size(High to Low)',
    },
  ];
  const { visible, onPressModalClose } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity
        style={localStyles.modalMainContainer}
        activeOpacity={1}
        onPress={onPressModalClose}>
        <TouchableOpacity
          activeOpacity={1}
          style={[localStyles.root, { backgroundColor: colors.inputBg }]}>
          <EText type="b18" style={{ paddingVertical: 10 }}>
            {strings.sortBy}
          </EText>

          <View style={{ height: 200 }}>
            <FlatList
              data={category}
              renderItem={({ item }) => {
                return (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => handlecat(item.id)}>
                      {cat === item.id ? (
                        <Ionicons
                          name="radio-button-on-outline"
                          size={moderateScale(20)}
                          color={'#008079'}
                          style={{ alignSelf: 'flex-end' }}
                        />
                      ) : (
                        <Ionicons
                          name="radio-button-off-outline"
                          size={moderateScale(20)}
                          color={'#008079'}
                          style={{ alignSelf: 'flex-end' }}
                        />
                      )}
                      <EText
                        type="b14"
                        style={{
                          alignSelf: 'center',
                          padding: 8,
                          color: 'gray',
                        }}>
                        {item.name}
                      </EText>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EButton
              title={'Cancel'}
              type={'S14'}
              color={colors.new_primary}
              bgColor={'#DAF3F2'}
              containerStyle={localStyles.signBtnContainer}
              onPress={onPressModalClose}
            />
            <EButton
              title={'Apply'}
              type={'S14'}
              containerStyle={localStyles.signBtnContainer}
              onPress={onPressModalClose}
              bgColor={'#008079'}
              color="#fff"
            />
          </View>
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
    height: getHeight(50),
    borderRadius: moderateScale(22),
    width: moderateScale(120),
    ...styles.selfCenter,
  },
});

export default SortByModal;
