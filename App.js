import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/homeScreen';
import CoinDetailedScreen from './src/screens/coinDetailedScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CoinDetailedScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
});
