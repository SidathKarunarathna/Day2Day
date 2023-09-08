import { StyleSheet, Text, View } from 'react-native';

import Login from './src/Screens/login';
export default function App() {
  return (
    <View >
      <Login/>
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
