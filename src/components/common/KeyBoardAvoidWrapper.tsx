// Library Imports
import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, ViewStyle } from 'react-native';

// Local Imports
import { isIOS, moderateScale } from '../../common/constants';
import { styles } from '../../themes';

interface IKeyBoardAvoidWrapper {
  children?: ReactNode;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

// KeyboardAvoidWrapper Component
export default KeyBoardAvoidWrapper = ({
  children,
  containerStyle,
  contentContainerStyle,
}: IKeyBoardAvoidWrapper) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={isIOS ? moderateScale(50) : null}
      style={[styles.flex, containerStyle]}
      behavior={isIOS ? 'padding' : null}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
