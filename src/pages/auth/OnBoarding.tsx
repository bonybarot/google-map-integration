import React, { Fragment, useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import images from '../../assets/images';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../common/constants';
import EButton from '@commonComponents/EButton';
import EText from '@commonComponents/EText';
import strings from '@i18n/strings';
import { SCREENS } from '@navigation/NavigationKeys';
import { useAppSelector } from '../../store';
import { themeSelector } from '@reducers/theme.reducer';
import { styles } from '../../themes';
import { setOnBoarding } from '@utils/asyncstorage';
import { OnBoardingSlide } from '@utils/constant';

const OnBoarding = ({ navigation }) => {
  const { current } = useAppSelector(themeSelector);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.Auth }],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: deviceWidth * (currentIndex + 1),
      });
    }
  };

  const titleText = () => {
    switch (currentIndex) {
      case 0:
        return strings.onBoardingTitle1;
      case 1:
        return strings.onBoardingTitle2;
      case 2:
        return strings.onBoardingTitle3;
    }
  };

  const DescText = () => {
    switch (currentIndex) {
      case 0:
        return strings.onBoardingDesc1;
      case 1:
        return strings.onBoardingDesc2;
      case 2:
        return strings.onBoardingDesc3;
    }
  };

  const RenderOnboardingItem = useCallback(
    ({ item }) => {
      return (
        <View style={localStyles.rendetItemConatiner}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={localStyles.imageStyle}
          />
        </View>
      );
    },
    [OnBoardingSlide],
  );

  return (
    <Fragment>
      <ImageBackground
        source={images.BackgroundImg}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <FlatList
          data={OnBoardingSlide}
          ref={slideRef}
          renderItem={({ item, index }) => (
            <RenderOnboardingItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          pagingEnabled
        />
        <View style={styles.rowCenter}>
          {OnBoardingSlide.map((_, index) => (
            <View
              key={_.id}
              style={[
                localStyles.bottomIndicatorStyle,
                {
                  width:
                    index !== currentIndex
                      ? moderateScale(10)
                      : moderateScale(10),
                  backgroundColor:
                    index !== currentIndex ? '#D2E5E1' : current.new_primary,
                  borderWidth: 2,
                  borderColor: current.new_primary,
                },
              ]}
            />
          ))}
        </View>
        <View
          style={{
            borderRadius: 30,
            backgroundColor: '#FFF',
            height: getHeight(300),
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <EText
                align={'center'}
                // color={current.new_primary}
                style={{ marginHorizontal: 10 }}
                type={'B26'}
                color={undefined}>
                {titleText()}
              </EText>
              <EText align={'center'} type={'r16'} color="gray">
                {DescText()}
              </EText>
            </View>
            <View>
              <EButton
                title={currentIndex === 2 ? 'Get Started' : strings.next}
                type={'M18'}
                color={current.white}
                bgColor={current.new_primary}
                onPress={onPressRightArrow}
                // onPress={() => navigation.navigate(SCREENS.OnBoarding4)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Fragment>
  );
};

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mt15,
    ...styles.mh25,
    // width: '100%',
  },
  rendetItemConatiner: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  imageStyle: {
    height: deviceHeight - getHeight(340),
    width: deviceWidth - moderateScale(40),
  },
  bottomIndicatorStyle: {
    height: moderateScale(10),
    ...styles.mt10,
    borderRadius: moderateScale(10),
    ...styles.mh5,
    margin: 15,
  },
  bottomStyle: {
    backgroundColor: 'white',
    ...styles.pv10,
    minHeight: getHeight(340),
    borderTopEndRadius: moderateScale(26),
    borderTopStartRadius: moderateScale(26),
    ...styles.center,
    ...styles.ph20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OnBoarding;
