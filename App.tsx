import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from './assets/color';
import Login from './src/Screens/login';
import Register from './src/Screens/Register';
import CreateDiary from './src/Screens/CreateDiary';
import CalenderScreen from './src/Screens/CalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reports from './src/Screens/Reports';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={Colors.main} />
      <stack.Navigator initialRouteName="Diary" screenOptions={{ headerShown: false }}>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Register" component={Register} />
        <stack.Screen name="Diary" component={CreateDiary} />
        <stack.Screen name="Calendar" component={CalenderScreen} />
        <stack.Screen name="Reports" component={Reports} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

