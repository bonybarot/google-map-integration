// ** React Imports

import { Fragment } from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import EText from '../common/EText';
const MultiRadio = (props: any) => {
  const {
    label,
    value,
    error,
    onChange,
    labelKey,
    required,
    disableType,
    valueKey,
    options,
    direction,
  } = props;
  const handleChange = (val: string) => {
    onChange(val);
  };
  return (
    <Fragment>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <EText style={{ textAlign: 'left', opacity: 0.9 }} type={'b18'}>
            {label}
          </EText>
          {required && <Text style={{ color: 'red' }}>*</Text>}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: direction ? 'row' : 'column',
          }}>
          {options.map((e: string, index: number) => {
            return (
              <View key={index}>
                <RadioButton
                  id={e[valueKey]}
                  disabled={e[disableType] === 'true' ? true : false}
                  selected={value === e[valueKey]}
                  onPress={() => handleChange(e[valueKey])}
                  label={e[labelKey]}
                  labelStyle={{ color: '#000000' }}
                  color="#3273dc"
                />
              </View>
            );
          })}
        </View>
      </View>
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </Fragment>
  );
};
export default MultiRadio;
