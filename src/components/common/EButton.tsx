//Library Imports
import React, { ReactElement, ReactNode } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

//Local Imports
import { getHeight, moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';
import { styles } from '../../themes';
import EText from './EText';
import ELoader from './Eloader';

interface IButton extends TouchableOpacityProps {
  title?: string;
  type?: string;
  color?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  style?: TextStyle;
  icon?: ReactElement;
  frontIcon?: ReactElement;
  bgColor?: string;
  children?: ReactNode;
  height?: number;
  loading?: boolean;
}

export default function EButton({
  title,
  type,
  color,
  onPress,
  loading,
  containerStyle,
  style,
  icon,
  frontIcon,
  bgColor,
  children,
  height,
  ...props
}: IButton) {
  const localStyle = StyleSheet.create({
    btnContainer: {
      height: getHeight(height ?? 55),
      borderRadius: moderateScale(height ?? 55) / 15,
      margin: 15,
    },
  });

  const colors = useAppSelector(state => state.theme.current);
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? { backgroundColor: bgColor }
          : { backgroundColor: colors.new_primary },
        { opacity: props.disabled || loading ? 0.3 : 1 },
      ]}
      onPress={onPress}
      {...props}>
      {frontIcon && frontIcon}
      {loading ? (
        <ELoader loading={true} mode="button" size="small" />
      ) : (
        title && (
          <EText type={type} style={style} color={color ? color : colors.white}>
            {title}
          </EText>
        )
      )}
      {icon && icon}
      {children && children}
    </TouchableOpacity>
  );
}
