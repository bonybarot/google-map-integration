import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import EText from './EText';
import images from '../../assets/images';
import RatingList from './RatingList';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { useAppSelector } from '../../store';
const UserSearchTab = (props: any) => {
  const { current } = useAppSelector(themeSelector);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={localStyles.holetInfoContainer}>
      <Image
        source={{ uri: props.primary_image }}
        style={{
          height: 180,
          width: '100%',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      {props.booking_status === 'Sold Out' && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            padding: 6,
            borderRadius: 6,
            backgroundColor: current.redColor,
          }}>
          <EText type="b12" color={current.white}>
            {props.booking_status}
          </EText>
        </View>
      )}
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <EText type="b20">{props.name}</EText>
          {props.typeland === 'land' && (
            <EText
              type="b16"
              numberOfLines={2}
              style={{
                color: current.new_primary,
              }}>
              {props.type}
            </EText>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Image source={images.LocationSmallIcon} />
          <EText type="r16" numberOfLines={2}>
            {props.location}
          </EText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {props.typeland === 'land' ? (
            <EText type="b16">{props.property_type}</EText>
          ) : (
            <RatingList reviews={props.reviews} size={24} gap={4} />
          )}
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              alignItems: 'center',
            }}>
            <EText
              type="r16"
              style={{
                color: current.new_primary,
              }}>
              {props.price}
            </EText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const localStyles = StyleSheet.create({
  holetInfoContainer: {
    borderRadius: 10,
    // borderWidth: 1,
    margin: 20,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
});
export default UserSearchTab;
