import React from 'react';
import { View, ViewStyle } from 'react-native';
import EText from './EText';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import strings from '../../i18n/strings';
const EStatus = ({
  status,
  type,
  style,
}: {
  status: string;
  style?: ViewStyle;
  type: 'Text' | 'Chip';
}) => {
  const { current } = useAppSelector(themeSelector);
  let backgroundColor = '';
  let color = '';
  if (
    [
      'paid',
      'accepted',
      'payment success',
      'completed',
      'available',
      'success',
    ].includes(status.toLowerCase())
  ) {
    backgroundColor = current.status.green.bg;
    color = current.status.green.text;
  } else {
    backgroundColor = current.status.red.bg;
    color = current.status.red.text;
  }
  if (type === 'Text') {
    return (
      <EText type="b15" color={color}>
        {strings[status]}
      </EText>
    );
  }
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: 130,
        borderRadius: 5,
        alignItems: 'center',
        padding: 3,
        marginVertical: 10,
        ...style,
      }}>
      <EText type="b15" color={color}>
        {status}
      </EText>
    </View>
  );
};

export default EStatus;
