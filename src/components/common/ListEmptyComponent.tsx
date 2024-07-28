import EText from './EText';
import strings from '../../i18n/strings';
import { View } from 'react-native';

const ListEmptyComponent = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginVertical: 20,
        alignItems: 'center',
      }}>
      <EText type="s18">{message ?? strings.noDataFound}</EText>
    </View>
  );
};
export default ListEmptyComponent;
