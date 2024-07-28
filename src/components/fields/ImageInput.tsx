import { createRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import images from '../../assets/images';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { styles } from '../../themes';
import typography from '../../themes/typography';
import EText from '../common/EText';
import ImagePickerSheet from '../models/ImagePickerSheet';
import { getWidth } from '../../common/constants';
const Select = ({ value, onChange, error, required, label }: any) => {
  const { current } = useAppSelector(themeSelector);
  const PictureSheetRef = createRef();
  const onPressPic = () => PictureSheetRef?.current.show();
  const _errorText = error ? error.message : null;

  const onSelectImage = (url: string) => {
    onChange(url);
  };

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
      <View style={localStyles.UploadImageContainer}>
        {value ? (
          <TouchableOpacity onPress={onPressPic}>
            <Image
              source={{ uri: value }}
              style={{
                alignSelf: 'center',
                height: 80,
                width: 100,
                borderRadius: 20,
                flex: 1,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={localStyles.UploadImage}
            onPress={onPressPic}>
            <Image
              source={images.ImageOfUploadImage}
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        )}
        <View style={localStyles.DeleteUpdateContainer}>
          <TouchableOpacity
            style={localStyles.buttonContainer}
            onPress={() => onChange(null)}>
            <EText type="b16">{strings.delete}</EText>
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.buttonContainer}
            onPress={onPressPic}>
            <EText type="b16">{strings.select}</EText>
          </TouchableOpacity>
        </View>
      </View>
      {_errorText && _errorText !== '' ? (
        <EText
          style={{
            ...localStyles.errorText,
            color: current.alertColor,
          }}>
          {_errorText}
        </EText>
      ) : null}
      <ImagePickerSheet
        onSelect={onSelectImage}
        SheetRef={PictureSheetRef}
        mediaType="photo"
      />
    </View>
  );
};

export default Select;

const localStyles = StyleSheet.create({
  UploadImageContainer: {
    flex: 1,
    flexDirection: 'row',
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
  UploadImage: {
    backgroundColor: '#FFEEEC',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#FE7765',
    borderRadius: 20,
    width: getWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  DeleteUpdateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 30,
    marginStart: 10,
    backgroundColor: '#FFEEEC',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#FE7765',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
