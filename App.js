import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SimpleDragNDrop from './src/components/SimpleDragNDrop';

export default function App() {
  return (
    <View style={styles.container}>
      <SimpleDragNDrop />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
