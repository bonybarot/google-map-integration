import { createRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';
import strings from '../../i18n/strings';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import { styles } from '../../themes';
import typography from '../../themes/typography';
import EText from '../common/EText';
import ImagePickerSheet from '../models/ImagePickerSheet';
const MultiImageVideoInput = ({
  value,
  onChange,
  error,
  required,
  label,
}: any) => {
  const { current } = useAppSelector(themeSelector);
  const PictureSheetRef = createRef();
  const onPressPic = () => PictureSheetRef?.current.show();
  const _errorText = error ? error.message : null;

  const onSelectImage = (url: string) => {
    if (value) {
      onChange([...value, url]);
    } else {
      onChange([url]);
    }
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
      <TouchableOpacity style={localStyles.UploadImage} onPress={onPressPic}>
        <View style={{ padding: 10 }}>
          <Image
            source={images.ImageOfUploadImage}
            style={{ alignSelf: 'center' }}
          />
          <View style={{ alignSelf: 'center' }}>
            <EText type="r" color={current.new_primary} style={{ padding: 10 }}>
              {strings.clickTOAddFiles}
            </EText>
          </View>
        </View>
      </TouchableOpacity>
      {value && value.length > 0 && (
        <FlatList
          data={value}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: 10 }}>
                <Image
                  source={{ uri: item }}
                  style={{ height: 75, width: 107, borderRadius: 15 }}
                />
                <TouchableOpacity
                  onPress={() =>
                    onChange(value.filter((e: string) => e !== item))
                  }
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 20,
                    width: 20,
                    position: 'absolute',
                    right: -5,
                    top: -5,
                    backgroundColor: current.grayScale5,
                    borderRadius: 10,
                  }}>
                  <Ionicons name="close" size={15} />
                </TouchableOpacity>
              </View>
            );
          }}
          horizontal={true}
        />
      )}
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

export default MultiImageVideoInput;

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
  },
});
