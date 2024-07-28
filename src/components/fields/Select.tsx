import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getHeight, moderateScale } from '../../common/constants';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { styles } from '../../themes';
import typography from '../../themes/typography';
import EText from '../common/EText';
const Select = ({
  value,
  onChange,
  search,
  options,
  error,
  required,
  labelField,
  label,
  dropdownPosition,
  valueField,
  placeholder,
  searchPlaceholder,
}: any) => {
  const { current } = useAppSelector(themeSelector);
  const _errorText = error ? error.message : null;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      {label && (
        <View style={localStyles.labelContainer}>
          <View style={styles.flexRow}>
            <EText style={localStyles.labelText} type={'b18'}>
              {label}
            </EText>
            {required && (
              <EText style={{ color: current.alertColor }}>{' *'}</EText>
            )}
          </View>
        </View>
      )}
      <Dropdown
        style={[
          localStyles.dropdownStyle,
          {
            backgroundColor: current.white,
            borderColor: error ? current.alertColor : current.bColor,
            ...styles.shadowStyle2,
          },
        ]}
        data={options}
        search={search}
        dropdownPosition={dropdownPosition ?? 'auto'}
        placeholderStyle={{ color: '#000000' }}
        selectedTextStyle={{ color: '#000000' }}
        itemTextStyle={{ color: '#000000' }}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onChange={(item: any) => {
          onChange(item.value);
        }}
        selectedTextProps={{ numberOfLines: 1 }}
      />
      {_errorText && _errorText !== '' ? (
        <EText
          style={{
            ...localStyles.errorText,
            color: current.alertColor,
          }}>
          {_errorText}
        </EText>
      ) : null}
    </View>
  );
};

export default Select;

const localStyles = StyleSheet.create({
  dropdownStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.ph25,
  },
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  errorText: {
    textAlign: 'left',
    ...typography.fontSizes.f12,
    ...styles.mt5,
    ...styles.ml10,
  },
  labelContainer: {
    ...styles.mt10,
    ...styles.rowSpaceBetween,
    ...styles.mb5,
  },
});
