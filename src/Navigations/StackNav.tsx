import {  StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDiary from '../Screens/CreateDiary';
import Home from '../Screens/Home';
import Reports from '../Screens/Reports';
import CalenderScreen from '../Screens/CalendarScreen';
import DiaryLists from '../Screens/DiaryList';
import ViewDiary from '../Screens/ViewDiary';
import CreateTask from '../Screens/CreateTask';
import AddFriendsPage from '../Screens/AddFriend';
import PendingRequestsPage from '../Screens/ViewPendingRequests';

const stack = createNativeStackNavigator();

export default function App() {

  return (
      <stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <stack.Screen name="Diary" component={CreateDiary} />
        <stack.Screen name="DiaryList" component={DiaryLists} />
        <stack.Screen name="ViewDiary" component={ViewDiary} />
        <stack.Screen name="Calendar" component={CalenderScreen} />
        <stack.Screen name="CreateTask" component={CreateTask} />
        <stack.Screen name="Reports" component={Reports} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="AddFriend" component={AddFriendsPage} />
        <stack.Screen name="PendingFriends" component={PendingRequestsPage} />
      </stack.Navigator>
  );
}

