// Library Imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Local Imports
import EButton from '@commonComponents/EButton';
import ESafeAreaView from '@commonComponents/ESafeAreaView';
import EText from '@commonComponents/EText';
import KeyBoardAvoidWrapper from '@commonComponents/KeyBoardAvoidWrapper';
import FormInput from '@fields/FormInput';
import strings from '@i18n/strings';
import { INavigation } from '@interfaces/common';
import { SCREENS } from '@navigation/NavigationKeys';
import { useIsFocused } from '@react-navigation/native';
import { authSelector } from '@reducers/auth.reducer';
import { themeSelector } from '@reducers/theme.reducer';
import { styles } from '@themes/index';
import { useForm } from 'react-hook-form';
import { Image } from 'react-native';
import images from '../../assets/images';
import { deviceWidth, getHeight, moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';

interface IFormData {
  email: string;
  password: string;
}
const Login = ({ navigation }: INavigation) => {
  const { current } = useAppSelector(themeSelector);
  const isFocused = useIsFocused();
  const { loading, defaultEmail, defaultPassword, deviceToken } =
    useAppSelector(authSelector);
  useEffect(() => {
    if (isFocused) {
      deviceToken;
    }
  }, [deviceToken, isFocused]);

  const [isCheck, setIsCheck] = useState<boolean>(false);
  // const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: { email: defaultEmail, password: defaultPassword },
    mode: 'onChange',
  });
  // const onPressSignUp = () => navigation.navigate(SCREENS.SignUp);
  // const onPressForgotPassword = () =>
  //   navigation.navigate(SCREENS.ForgotPassword);
  const onSubmit = async () => {
    // const formPayload: IFormData = {
    //   password: formData.password,
    //   email: formData.email,
    // };
    // if (isCheck) {
    //   await setAsyncStorageData(LOG_IN_CRED, formData);
    //   dispatch(setDefaultEmailPassword(formPayload));
    // } else {
    //   await removeUserDetail(LOG_IN_CRED);
    //   dispatch(setDefaultEmailPassword({ email: '', password: '' }));
    // }
    // const { payload } = await dispatch(loginUser(formPayload));
    // if (payload.data) {
    //   dispatch(socketActions.startConnecting());
    //   navigation.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: SCREENS.Drawer,
    //       },
    //     ],
    //   });
    // }
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREENS.Drawer,
        },
      ],
    });
  };

  useEffect(() => {
    if (defaultEmail) {
      setIsCheck(true);
    }
  }, []);

  const onError = () => {
    console.log('------in error');
  };

  return (
    <ESafeAreaView>
      <KeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <View style={{ marginTop: 50 }}>
            <Image
              source={images.ClearDuLogoText}
              resizeMode="contain"
              style={localStyles.imageStyle}
            />
          </View>
          <View style={{ marginBottom: 40, marginTop: 10 }}>
            <EText
              type={'b22'}
              align={'left'}
              style={{ flex: 1, textAlign: 'center' }}>
              {'Welcome back to clearDu'}
            </EText>
            <EText
              type={'m14'}
              align={'left'}
              style={
                (styles.mb20,
                { flex: 1, textAlign: 'center', color: 'gray', marginTop: 5 })
              }>
              {'We happy to see you here...'}
            </EText>
          </View>
          <EText
            type={'m16'}
            align={'left'}
            style={{ flex: 1, textAlign: 'center', marginVertical: 20 }}>
            {'Log in to your account'}
          </EText>

          <FormInput
            control={control}
            name="email"
            placeholder={strings.email}
            // required={true}
            type="email"
          />
          <FormInput
            control={control}
            name="password"
            type="password"
            // required={true}
            placeholder={strings.password}
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setIsCheck(!isCheck)}
              style={localStyles.checkboxContainer}>
              <Ionicons
                name={isCheck ? 'checkbox' : 'square-outline'}
                size={moderateScale(23)}
                color={current.new_primary}
              />
              <EText
                type={'s14'}
                style={{ marginHorizontal: 5, color: 'gray' }}>
                {strings.rememberMe}
              </EText>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={onPressForgotPassword}
              style={localStyles.checkboxContainer}>
              <EText
                type={'s14'}
                align={'center'}
                color={current.new_primary}
                style={styles.mh10}>
                {strings.forgotPassword}
              </EText>
            </TouchableOpacity> */}
          </View>
        </View>
        <EButton
          title={strings.signIn}
          type={'S16'}
          loading={loading}
          onPress={handleSubmit(onSubmit, onError)}
          // onPress={() => onSubmit}
        />
        {/* <TouchableOpacity
          onPress={onPressSignUp}
          style={[localStyles.signUpContainer]}>
          <EText type={'r'}>{strings.dontHaveAccount}</EText>
          <EText type={'b16'} color={current.new_primary}>
            {` ${strings.signUp}`}
          </EText>
        </TouchableOpacity> */}
      </KeyBoardAvoidWrapper>
    </ESafeAreaView>
  );
};

export default Login;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
  orContainer: {
    height: getHeight(1),
    width: '30%',
  },
  signBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv10,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
    alignSelf: 'flex-start',
    marginHorizontal: 5,
  },
  socialBtnContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  socialBtn: {
    ...styles.center,
    height: getHeight(60),
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.mh10,
  },
  imageStyle: {
    height: getHeight(60),
    margin: 50,
    alignSelf: 'center',
  },
  rendetItemConatiner: {
    width: deviceWidth,
    // ...styles.ph20,
    ...styles.center,
  },
});
