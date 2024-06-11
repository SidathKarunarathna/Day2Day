import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from './assets/color';
import Login from './src/Screens/login';
import Register from './src/Screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import BottomNav from './src/Navigations/BottomNav';


const stack = createNativeStackNavigator();

export default function App() {
  const [user,setUser]= useState<User | null>(null);
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      setUser(user);
    })
  })
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={Colors.main} />
      <stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Register" component={Register} />
        <stack.Screen name="Bottom" component={BottomNav} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

