import {  StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDiary from '../Screens/CreateDiary';
import Home from '../Screens/Home';
import Reports from '../Screens/Reports';
import CalenderScreen from '../Screens/CalendarScreen';
import DiaryLists from '../Screens/DiaryList';

const stack = createNativeStackNavigator();

export default function App() {

  return (
      <stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <stack.Screen name="Diary" component={CreateDiary} />
        <stack.Screen name="DiaryList" component={DiaryLists} />
        <stack.Screen name="Calendar" component={CalenderScreen} />
        <stack.Screen name="Reports" component={Reports} />
        <stack.Screen name="Home" component={Home} />
      </stack.Navigator>
  );
}

