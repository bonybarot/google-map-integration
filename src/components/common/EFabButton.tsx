import React, { ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';

interface CustomFabButtonProps {
  onPress: () => void;
  children: ReactNode;
}

const EFabButton: React.FC<CustomFabButtonProps> = ({ onPress, children }) => {
  const FabTouchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  const { current } = useAppSelector(themeSelector);
  return (
    <View style={styles.fabContainer}>
      <FabTouchable onPress={onPress}>
        <View style={[styles.fab, { backgroundColor: current.new_primary }]}>
          {children}
        </View>
      </FabTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 60,
    right: 15,
    elevation: 4, // For Android elevation effect
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EFabButton;
