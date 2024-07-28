export interface IColor {
  value: string;
  backgroundColor: string;
  textColor: string;
  textRevertColor: string;
  btnColor3: string;
  inputBg: string;
  dark3: string;
  iconColor: string;
  bColor: string;
  btnColor: string;
  imageBg: string;
  primary4: string;
  inactive: string;
  backgroundColor1: string;
  backgroundColor2: string;
  textColor2: string;
}

export interface IViewColor {
  text: string;
  bg: string;
}

export interface IStatusColor {
  green: IViewColor;
  red: IViewColor;
}
export interface ICommonColor {
  white: string;
  black: string;
  primary: string;
  divider: string;
  grayScale1: string;
  grayScale3: string;
  grayScale4: string;
  grayScale5: string;
  grayScale7: string;
  grayScale8: string;
  dark2: string;
  primary5: string;
  primaryD: string;
  primaryTransparent: string;
  placeHolderColor: string;
  borderColor: string;
  inputFocusColor: string;
  transparent: string;
  darkBg: string;
  redColor: string;
  lightRed: string;
  lightGray: string;
  orange: string;
  blue: string;
  modalBg: string;
  disabledColor: string;
  alertColor: string;
  transparentSilver: string;
  greenColor: string;
  new_primary: string;
  red_button: string;
  new_secondary: string;
  tabBar: string;
  status: IStatusColor;
}

//App colors
export const LightColor: IColor = {
  value: 'light',
  backgroundColor: '#FFFFFF',
  textColor: '#212121',
  textRevertColor: '#FFFFFF',
  btnColor3: '#EEEEEE',
  inputBg: '#FAFAFA',
  dark3: '#EEEDFE',
  iconColor: '#9E9E9E',
  bColor: '#EEEEEE',
  btnColor: '#101010',
  imageBg: '#F3F3F3',
  primary4: '#404040',
  inactive: '#9E9E9E',
  backgroundColor1: '#FFFFFF',
  backgroundColor2: '#E5E5E5',
  textColor2: '#616161',
};

export const DarkColor: IColor = {
  value: 'dark',
  backgroundColor: '#181A20',
  textColor: '#FFFFFF',
  textRevertColor: '#212121',
  btnColor3: '#1F222A',
  inputBg: '#1F222A',
  dark3: '#35383F',
  iconColor: '#616161',
  bColor: '#35383F',
  btnColor: '#FFFFFF',
  imageBg: '#35383F',
  primary4: '#E0E0E0',
  inactive: '#404040',
  backgroundColor1: '#181A20',
  backgroundColor2: '#1F222A',
  textColor2: '#E0E0E0',
};

// Common colors
export const commonColor: ICommonColor = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#101010',
  divider: '#ECECEC',
  grayScale1: '#F5F5F5',
  grayScale3: '#E0E0E0',
  grayScale4: '#BDBDBD',
  grayScale5: '#9E9E9E',
  grayScale7: '#616161',
  grayScale8: '#424242',
  dark2: '#1F222A',
  primary5: '#584CF4',
  primaryD: '#544BC3',
  primaryTransparent: '#584CF414',
  placeHolderColor: '#9E9E9E',
  borderColor: '#35383F',
  inputFocusColor: '#584CF414',
  transparent: '#00000000',
  darkBg: '#181A20',
  redColor: '#F75555',
  lightRed: '#FF5C74',
  lightGray: '#7575751F',
  orange: '#FB9400',
  blue: '#7210FF',
  modalBg: '#00000099',
  disabledColor: '#393939',
  alertColor: '#F75555',
  transparentSilver: '#10101014',
  greenColor: '#07BD74',
  new_primary: '#008079',
  new_secondary: '#FE7765',
  tabBar: '#FFEEEC',
  red_button: '#FF4040',
  status: {
    green: {
      text: '#008079',
      bg: '#B5DDDB',
    },
    red: {
      text: '#CB1800',
      bg: '#F4D0CC',
    },
  },
};

export interface IThemeColor extends ICommonColor, IColor {}
export interface IModeColor {
  light: IThemeColor;
  dark: IThemeColor;
}

export const colors: IModeColor = {
  light: {
    ...LightColor,
    ...commonColor,
  },
  dark: {
    ...DarkColor,
    ...commonColor,
  },
};
