import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const ToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#008079' }}
        thumbColor={isEnabled ? '#fff' : '#fff'}
        ios_backgroundColor={isEnabled ? '#008079' : '#fff'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    justifyContent: 'center',
  },
});

export default ToggleButton;
