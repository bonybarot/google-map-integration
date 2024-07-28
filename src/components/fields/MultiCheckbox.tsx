// ** React Imports

import CheckBox from '@react-native-community/checkbox';
import { Fragment } from 'react';
import { Text, View } from 'react-native';
import EText from '../common/EText';

const MultiCheckBox = (props: any) => {
  const { label, value, error, onChange, labelKey, valueKey, options } = props;
  const handleChange = (checked: boolean, val: string) => {
    let newValue = value ? [...value] : [];
    if (checked) {
      newValue.push(val);
    } else {
      newValue = newValue.filter((e: string) => e !== val);
    }
    onChange(newValue);
  };
  return (
    <Fragment>
      <Text>{label}</Text>
      <View>
        <View style={{ flexDirection: 'column' }}>
          {options.map((e: string) => {
            return (
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <CheckBox
                  style={{ height: 20, width: 20 }}
                  tintColors="#000000"
                  value={value?.includes(e[valueKey])}
                  onValueChange={() => {
                    handleChange(!value?.includes(e[valueKey]), e[valueKey]);
                  }}
                  boxType="square"
                />
                <EText type="b14" style={{ marginLeft: 10 }}>
                  {e[labelKey]}
                </EText>
              </View>
            );
          })}
        </View>
        {error && (
          <EText type="b14" style={{ color: 'red', marginTop: 10 }}>
            {error.message}
          </EText>
        )}
      </View>
    </Fragment>
  );
};

export default MultiCheckBox;
