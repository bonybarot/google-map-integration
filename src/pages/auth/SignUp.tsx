// Library Imports
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import strings from '../../i18n/strings';
import images from '../../assets/images';
import { styles } from '../../themes';
import EText from '../../components/common/EText';
import {
  ACCESS_TOKEN,
  getHeight,
  moderateScale,
  deviceWidth,
  deviceHeight,
} from '../../common/constants';
import EHeader from '../../components/common/EHeader';
import ESafeAreaView from '../../components/common/ESafeAreaView';
import {
  Google_Icon,
  Facebook_Icon,
  Apple_Light,
  Apple_Dark,
  AppLogo,
} from '../../assets/svgs';
import { SCREENS } from '../../navigation/NavigationKeys';
import EInput from '../../components/common/EInput';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import { validateEmail, validatePassword } from '../../utils/validators';
import EButton from '../../components/common/EButton';
import { setAsyncStorageData } from '../../utils/helpers';

const SignUp = ({ navigation }) => {
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary5,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary5;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, emailError, passwordError]);

  const onChangedEmail = val => {
    const { msg } = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };
  const onChangedPassword = val => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const RenderSocialBtn = memo(({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={item.onPress}
        style={[
          localStyles.socialBtn,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.bColor,
          },
        ]}>
        {item.icon}
      </TouchableOpacity>
    );
  });
  const onPressSignWithPassword = async () => {
    navigation.navigate(SCREENS.SignUpOTP);
  };

  const onPressPasswordEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );
  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };
  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off' : 'eye'}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  const onPressSignIn = () => {
    // navigation.reset(SCREENS.Login);
    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.Login }],
    });
  };

  return (
    // <ESafeAreaView>
    //   <EHeader isHideBack={true} />
    //   <KeyBoardAvoidWrapper>
    //     <View style={localStyles.mainContainer}>
    //       <View style={localStyles.rendetItemConatiner}>
    //         <Image
    //           source={images.signUpImg}
    //           resizeMode="contain"
    //           style={localStyles.imageStyle}
    //         />
    //       </View>
    //       <EText type={"b30"} style={styles.mv15}>
    //         {strings.signUp}
    //       </EText>
    //       <EInput
    //         placeHolder={strings.email}
    //         keyBoardType={"email-address"}
    //         _value={email}
    //         _errorText={emailError}
    //         autoCapitalize={"none"}
    //         insideLeftIcon={() => <EmailIcon />}
    //         toGetTextFieldValue={onChangedEmail}
    //         inputContainerStyle={[
    //           { backgroundColor: colors.inputBg },
    //           localStyles.inputContainerStyle,
    //           emailInputStyle,
    //         ]}
    //         inputBoxStyle={[localStyles.inputBoxStyle]}
    //         _onFocus={onFocusEmail}
    //         onBlur={onBlurEmail}
    //       />
    //       <EInput
    //         placeHolder={strings.password}
    //         keyBoardType={"default"}
    //         _value={password}
    //         _errorText={passwordError}
    //         autoCapitalize={"none"}
    //         insideLeftIcon={() => <PasswordIcon />}
    //         toGetTextFieldValue={onChangedPassword}
    //         inputContainerStyle={[
    //           { backgroundColor: colors.inputBg },
    //           localStyles.inputContainerStyle,
    //           passwordInputStyle,
    //         ]}
    //         _isSecure={isPasswordVisible}
    //         inputBoxStyle={[localStyles.inputBoxStyle]}
    //         _onFocus={onFocusPassword}
    //         onBlur={onBlurPassword}
    //         rightAccessory={() => <RightPasswordEyeIcon />}
    //       />
    //       <EButton
    //         title={strings.next}
    //         type={"S16"}
    //         color={isSubmitDisabled && colors.white}
    //         containerStyle={[localStyles.signBtnContainer]}
    //         onPress={onPressSignWithPassword}
    //         bgColor={colors.new_primary}
    //         // disabled={isSubmitDisabled}
    //       />
    //     </View>
    //   </KeyBoardAvoidWrapper>
    //   <TouchableOpacity
    //     onPress={onPressSignIn}
    //     style={localStyles.signUpContainer}
    //   >
    //     <EText
    //     // type={'b16'}
    //     // color={colors.dark ? colors.grayScale7 : colors.grayScale5}
    //     >
    //       {strings.AlreadyHaveAccount}
    //     </EText>
    //     <EText type={"b16"} color={colors.new_primary}>
    //       {" "}
    //       {strings.signIn}
    //     </EText>
    //   </TouchableOpacity>
    // </ESafeAreaView>
    <ESafeAreaView style={localStyles.root}>
      <ImageBackground
        source={images.BackgroundImg2}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <KeyBoardAvoidWrapper>
          <View style={localStyles.mainContainer}>
            {/* <EText type={"b30"} align={"left"} style={styles.mb20}>
          {strings.loginYourAccount}
        </EText> */}
            <View>
              <Image
                source={images.EzsipLogo}
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50),
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{ padding: moderateScale(50) }}>
              <EText type="b20" style={{ alignSelf: 'center' }}>
                Welcome to ezsip
              </EText>
              <EText type="r14" style={{ alignSelf: 'center', color: 'gray' }}>
                We will be happy to see you there...
              </EText>
            </View>
            <EText
              type="m18"
              style={{ alignSelf: 'center', margin: moderateScale(30) }}>
              Create an Account
            </EText>
            <EInput
              placeHolder={strings.userName}
              insideLeftIcon={() => (
                <Ionicons
                  name="person"
                  size={moderateScale(20)}
                  color={emailIcon}
                />
              )}
              toGetTextFieldValue={onChangedEmail}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                emailInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              // _onFocus={onFocusEmail}
              // onBlur={onBlurEmail}
            />
            <EInput
              placeHolder={strings.email}
              keyBoardType={'email-address'}
              _value={email}
              _errorText={emailError}
              autoCapitalize={'none'}
              insideLeftIcon={() => <EmailIcon />}
              toGetTextFieldValue={onChangedEmail}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                emailInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              // _onFocus={onFocusEmail}
              onBlur={onBlurEmail}
            />
            <EInput
              placeHolder={strings.phoneNumber}
              insideLeftIcon={() => (
                <Ionicons
                  name="call"
                  size={moderateScale(20)}
                  color={emailIcon}
                />
              )}
              toGetTextFieldValue={onChangedEmail}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                emailInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              // _onFocus={onFocusEmail}
              onBlur={onBlurEmail}
            />

            <EInput
              placeHolder={strings.password}
              keyBoardType={'default'}
              _value={password}
              _errorText={passwordError}
              autoCapitalize={'none'}
              insideLeftIcon={() => <PasswordIcon />}
              toGetTextFieldValue={onChangedPassword}
              inputContainerStyle={[
                { backgroundColor: colors.inputBg },
                localStyles.inputContainerStyle,
                passwordInputStyle,
              ]}
              _isSecure={isPasswordVisible}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              // _onFocus={onFocusPassword}
              onBlur={onBlurPassword}
              rightAccessory={() => <RightPasswordEyeIcon />}
            />
            {/* <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                // borderWidth: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsCheck(!isCheck)}
                style={localStyles.checkboxContainer}
              >
                <Ionicons
                  name={isCheck ? "square-outline" : "checkbox"}
                  size={moderateScale(23)}
                  color={colors.new_primary}
                />
                <EText type={"s16"} style={styles.mh10}>
                  {strings.rememberMe}
                </EText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressForgotPassword}
                style={localStyles.checkboxContainer}
              >
                <EText
                  type={"s16"}
                  align={"center"}
                  color={colors.new_primary}
                  style={styles.mh10}
                >
                  {strings.forgotPassword}
                </EText>
              </TouchableOpacity>
            </View> */}
            <EButton
              title={strings.signUp}
              type={'S16'}
              color={isSubmitDisabled && colors.white}
              containerStyle={localStyles.signBtnContainer}
              onPress={onPressSignWithPassword}
              bgColor={colors.new_primary}
            />
          </View>
          <TouchableOpacity
            onPress={onPressSignIn}
            style={localStyles.signUpContainer}>
            <EText
            // type={'b16'}
            // color={colors.dark ? colors.grayScale7 : colors.grayScale5}
            >
              {strings.AlreadyHaveAccount}
            </EText>
            <EText type={'b16'} color={colors.new_primary}>
              {' '}
              {strings.signIn}
            </EText>
          </TouchableOpacity>
        </KeyBoardAvoidWrapper>
        <EText style={{ alignSelf: 'center', color: 'gray', margin: 10 }}>
          Copyright @ 2023 All Rights Reserved.
        </EText>
      </ImageBackground>
    </ESafeAreaView>
  );
};

export default SignUp;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  rendetItemConatiner: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  imageStyle: {
    height: deviceHeight - getHeight(680),
    width: deviceWidth - moderateScale(40),
  },
  loginImage: {
    height: getHeight(160),
    width: '80%',
    ...styles.mv20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  orContainer: {
    height: moderateScale(1),
    width: '30%',
  },
  signBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
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
});
