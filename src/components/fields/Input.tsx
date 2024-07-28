import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import CountryPicker, {
  DARK_THEME,
  DEFAULT_THEME,
  FlagButton,
  FlagType,
  getAllCountries,
} from 'react-native-country-picker-modal';

import moment from 'moment';
import { moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';
import { themeSelector } from '@reducers/theme.reducer';
import { styles } from '../../themes';
import EInput from '../common/EInput';
const AddInput = (props: any) => {
  const {
    type,
    value,
    leftIcon,
    rightIcon,
    onChange,
    onBlur,
    autoCapitalize,
    error,
    minimumDate,

    ...inputProps
  } = props;
  const { current: colors } = useAppSelector(themeSelector);

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [DatePickerVisible, setDatePickerVisible] = useState(false);
  const [TimePickerVisible, setTimePickerVisible] = useState(false);

  const [callingCodeLib, setCallingCodeLib] = useState(91);
  const [countryCodeLib, setCountryCodeLib] = useState<any>('IN');
  const [visiblePiker, setVisiblePiker] = useState(false);

  const getCountries = async () => {
    try {
      const data = await getAllCountries(FlagType.EMOJI);
      if (data) {
        let callingCode = 91;

        if (value && value.length > 0 && value.indexOf(' ') > -1) {
          callingCode = value.split(' ')[0];
          callingCode = callingCode.replace('+', '');
        }
        const countryData = data.find(
          e => e.callingCode.indexOf(callingCode) > -1,
        );
        if (countryData) {
          setCallingCodeLib(callingCode);
          setCountryCodeLib(countryData.cca2);
        } else {
          console.log('No matching country data found.');
        }
      }
    } catch (er) {
      console.error('Error:', er);
    }
  };

  useEffect(() => {
    if (type === 'mobile' && value) {
      getCountries();
    }
  }, []);

  const getValue = () => {
    if (type === 'date' && value) {
      return moment(value).format('DD/MM/YYYY');
    } else if (type === 'MonthAndDay' && value) {
      return moment(value.toISOString()).format('MMM DD');
    } else if (type === 'time' && value) {
      return moment(value.toISOString()).format('hh:mm A');
    } else if (type === 'mobile' && value) {
      if (value && value.length > 0 && value.indexOf(' ') > -1) {
        const values = value.split(' ');
        return values[1];
      }
    }
    return value;
  };
  const [showingValue, setShowingValue] = useState(getValue());
  const HandleConfirmDate = (date: Date) => {
    valueChange(date);
    setDatePickerVisible(false);
  };
  const HandleConfirmTime = (time: Date) => {
    valueChange(time);
    setTimePickerVisible(false);
  };

  const valueChange = (val: any) => {
    let newValue = val;
    if (type === 'mobile') {
      newValue = `+${callingCodeLib} ${newValue}`;
    }
    if (type === 'date') {
      setShowingValue(moment(val.toISOString()).format('DD/MM/YYYY'));
      onChange(newValue);
    } else if (type === 'datetime') {
      setShowingValue(moment(val.toISOString()).format('DD/MM/YYYY hh:mm a'));
      onChange(newValue);
    } else if (type === 'time') {
      setShowingValue(moment(val.toISOString()).format('hh:mm A'));
      onChange(newValue);
    } else if (type === 'MonthAndDay') {
      setShowingValue(moment(val.toISOString()).format('MMM DD'));
      onChange(newValue);
    } else if (type === 'location') {
      setShowingValue(val.formatted_address);
      onChange(val);
    } else {
      setShowingValue(val);
      onChange(newValue.trim());
    }
  };

  useEffect(() => {
    if (!type || type === 'number') {
      setShowingValue(value);
    }
  }, [value]);

  const shadowStyle = {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  };

  const BlurredStyle = {
    backgroundColor: colors.white,
    ...shadowStyle,
  };

  const FocusedStyle = {
    backgroundColor: colors.white,
    borderColor: colors.new_primary,
    ...shadowStyle,
  };

  const [inputStyle, setInputStyle] = useState(BlurredStyle);

  const onFocusInput = () => {
    setInputStyle(FocusedStyle);
  };
  const onBlurInput = () => {
    setInputStyle(BlurredStyle);
    if (onBlur) {
      onBlur(value);
    }
  };
  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };
  const ShowTimePicker = () => {
    setTimePickerVisible(true);
  };
  const HideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const HideTimePicker = () => {
    setTimePickerVisible(false);
  };
  const RightPasswordEyeIcon = () => (
    <TouchableOpacity onPress={onPressPasswordEyeIcon}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off' : 'eye'}
        size={moderateScale(20)}
        color={colors.new_primary}
      />
    </TouchableOpacity>
  );
  const RightDateIcon = () => {
    let dateValue = value;
    if (typeof dateValue === 'string') {
      dateValue = new Date(dateValue);
    }
    return (
      <View>
        <TouchableOpacity
          onPress={ShowDatePicker}
          disabled={props.disabled ? true : false}>
          <Ionicons
            name={'calendar'}
            size={moderateScale(20)}
            color={colors.new_primary}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={props.isVisible ? false : DatePickerVisible}
          mode="date"
          date={dateValue ? dateValue : new Date()}
          onConfirm={HandleConfirmDate}
          onCancel={HideDatePicker}
        // {...(minimumDate && {
        //   minimumDate: minimumDate,
        // })}
        // {...(maximumDate && {
        //   maximumDate: maximumDate,
        // })}
        />
      </View>
    );
  };

  const RightTimeIcon = () => {
    let dateValue = value;
    if (typeof dateValue === 'string') {
      dateValue = new Date(dateValue);
    }
    return (
      <View>
        <TouchableOpacity
          onPress={ShowTimePicker}
          disabled={props.disabled ? true : false}>
          <Ionicons
            name={'time-outline'}
            size={moderateScale(20)}
            color={colors.new_primary}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={props.isVisible ? false : TimePickerVisible}
          mode="time"
          date={dateValue || new Date()}
          {...(minimumDate && {
            minimumDate: minimumDate,
          })}
          onConfirm={HandleConfirmTime}
          onCancel={HideTimePicker}
        />
      </View>
    );
  };

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

  const openCountryPicker = () => setVisiblePiker(true);
  const closeCountryPicker = () => setVisiblePiker(false);

  const BlurredIconStyle = colors.grayScale5;

  const countryIcon = () => {
    return (
      <View style={styles.rowSpaceBetween}>
        <FlagButton
          value={callingCodeLib}
          onOpen={
            props.visible ? setTimePickerVisible(false) : openCountryPicker
          }
          withEmoji={true}
          countryCode={countryCodeLib}
          withCallingCodeButton={true}
          containerButtonStyle={localStyles.countryPickerButton}
        />
        <Ionicons
          name="chevron-down-outline"
          size={moderateScale(20)}
          color={BlurredIconStyle}
          onPress={
            props.visible ? setTimePickerVisible(false) : openCountryPicker
          }
        />
      </View>
    );
  };

  const onSelectCountry = (country: any) => {
    setCountryCodeLib(country.cca2);
    setCallingCodeLib(country.callingCode[0]);
    if (showingValue) {
      onChange(`+${country.callingCode[0]} ${showingValue}`);
    }
    closeCountryPicker();
  };

  return (
    <Fragment>
      <EInput
        _value={showingValue}
        _errorText={error ? error.message : null}
        autoCapitalize={autoCapitalize ?? 'none'}
        insideLeftIcon={leftIcon}
        {...(rightIcon
          ? {
            rightAccessory: rightIcon,
          }
          : type === 'password'
            ? {
              rightAccessory: () => <RightPasswordEyeIcon />,
              _isSecure: isPasswordVisible,
            }
            : type === 'date' || type === 'MonthAndDay'
              ? {
                rightAccessory: () => <RightDateIcon />,
              }
              : type === 'time'
                ? {
                  rightAccessory: () => <RightTimeIcon />,
                }
                : null)}
        type={type}
        ShowDatePicker={ShowDatePicker}
        toGetTextFieldValue={valueChange}
        inputContainerStyle={[
          { backgroundColor: colors.inputBg },
          localStyles.inputContainerStyle,
          inputStyle,
        ]}
        inputBoxStyle={[localStyles.inputBoxStyle]}
        _onFocus={onFocusInput}
        _onBlur={onBlurInput}
        {...(type === 'mobile' && {
          keyboardType: 'numeric',
          _maxLength: 10,
          insideLeftIcon: countryIcon,
        })}
        {...(type === 'email' && {
          keyboardType: 'email-address',
          insideLeftIcon: () => (
            <Fontisto name={'email'} size={14} color={colors.new_primary} />
          ),
        })}
        {...(type === 'password' && {
          insideLeftIcon: () => (
            <Fontisto name={'locked'} size={14} color={colors.new_primary} />
          ),
        })}
        {...(type === 'number' && {
          keyboardType: 'numeric',
        })}
        {...inputProps}
      />
      <CountryPicker
        countryCode={'IN'}
        withFilter={true}
        visible={visiblePiker}
        withFlag={true}
        withFlagButton={true}
        onSelect={country => onSelectCountry(country)}
        withCallingCode={true}
        withAlphaFilter={true}
        withCountryNameButton={true}
        onClose={closeCountryPicker}
        renderFlagButton={() => {
          return null;
        }}
        theme={colors.value === 'dark' ? DARK_THEME : DEFAULT_THEME}
      />
    </Fragment>
  );
};
export default AddInput;

const localStyles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  countryPickerButton: {
    ...styles.alignStart,
    ...styles.justifyCenter,
  },
});
