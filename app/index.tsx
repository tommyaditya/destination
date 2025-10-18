import React from 'react';
import LabuanBajoDetailScreen from './screens/LabuanBajoDetailScreen';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    // Menggunakan SafeAreaView dan StatusBar untuk layout yang bersih
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      <LabuanBajoDetailScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
});

export default App;