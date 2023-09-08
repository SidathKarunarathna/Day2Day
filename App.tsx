import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Colors from './assets/color';
import Login from './src/Screens/login';
import Register from './src/Screens/Register';
export default function App() {
  return (
    <View >
      <StatusBar translucent={false}  backgroundColor={Colors.main}/> 
      <Register/>
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
