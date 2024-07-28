import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import EButton from './EButton';
import EText from './EText';
import RatingList from './RatingList';
import { styles } from '../../themes';
import images from '../../assets/images';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { index } from 'realm';
const VendorSearchTab = (props: any) => {
  const { current } = useAppSelector(themeSelector);
  return (
    // <View
    //   style={{
    //     marginVertical: 5,
    //     marginHorizontal: 10,
    //     ...styles.shadowStyle,
    //     borderRadius: 20,
    //     backgroundColor: 'white',
    //   }}>
    <TouchableOpacity
      style={localStyles.ChatListContainer}
      onPress={props.onPress}>
      <View style={localStyles.hotelImageContainer}>
        <Image
          source={{ uri: props.primary_image }}
          resizeMode="contain"
          style={localStyles.ImageContainer}
        />
      </View>
      <View style={{ flex: 1, marginRight: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <EText type="b20" style={{ flex: 1 }}>
            {props.name}
          </EText>
          <EText
            type="b12"
            style={{
              marginLeft: 5,
              color:
                props.status === 'Approved'
                  ? current.new_primary
                  : current.redColor,
            }}>
            {strings[props.status]}
          </EText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
          }}>
          <Image source={images.LocationSmallIcon} />
          <EText style={{ marginLeft: 5 }} numberOfLines={1}>
            {props.location}
          </EText>
        </View>
        {props.typeland === 'land' ? (
          <EText type="b16">{props.property_type}</EText>
        ) : (
          <RatingList reviews={props.reviews} size={15} gap={4} />
        )}
        {/* <RatingList reviews={props.reviews} /> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
          }}>
          <Image source={images.dollaricon} />
          <EText style={{ marginLeft: 2 }}>{props.price}</EText>
        </View>
        <View style={{ flexDirection: 'row', gap: 6, marginVertical: 10 }}>
          <View style={{ flex: 1 }}>
            <EButton
              onPress={props.edit}
              loading={props.editLoading === index}
              style={{ textAlign: 'center' }}
              title={strings.edit}
              type={'S16'}
              height={30}
              bgColor={current.new_primary}
            />
          </View>
          <View style={{ flex: 1 }}>
            <EButton
              style={{ textAlign: 'center' }}
              title={strings.delete}
              height={30}
              type={'S16'}
              loading={props.deleteLoading === index}
              onPress={props.delete}
              bgColor={current.redColor}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // </View>
  );
};
const localStyles = StyleSheet.create({
  SearchBarContainer: {
    elevation: 10,
    borderRadius: 15,
    height: 50,
  },
  ImageContainer: {
    margin: 10,
    height: 80,
    width: 100,
  },
  ChatListContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    ...styles.shadowStyle,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  Chat: {
    ...styles.selfCenter,
    ...styles.mt20,
  },
  HeadContainer: {
    // flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  hotelImageContainer: {
    ...styles.selfCenter,
  },
});
export default VendorSearchTab;
