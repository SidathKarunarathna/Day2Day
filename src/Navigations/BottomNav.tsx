import { View,Text,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import CalenderScreen from '../Screens/CalendarScreen';
import DiaryLists from "../Screens/DiaryList";
import Colors from "../../assets/color";
import StackNav from "./StackNav";
import FriendsPage from "../Screens/ViewFriends";

const Tab = createBottomTabNavigator()



const BottomNav = ()=>{
    return(
        <Tab.Navigator backBehavior="main" initialRouteName="Main" screenOptions={{
           tabBarShowLabel:false,
           tabBarStyle:{...styles.tab},
            headerShown:false,
            tabBarHideOnKeyboard:true
        }}>
            <Tab.Screen name="Main" component={StackNav} options={{
                tabBarIcon:({focused})=>(
                    <TouchableOpacity>
                        {focused ?(
                            <Entypo name="home" size={24} color={Colors.main}/>
                        ):(<AntDesign name="home" size={24} color={Colors.black}/>)}
                    </TouchableOpacity>
                )
            }}/>
            <Tab.Screen name="Cart" component={CalenderScreen} options={{
                //
                tabBarIcon:({focused})=>(
                    <TouchableOpacity>
                        {focused ?(
                            <FontAwesome5 name="calendar" size={24} color={Colors.main}/>
                        ):(<MaterialCommunityIcons name="calendar" size={24} color={Colors.black}/>)}
                    </TouchableOpacity>
                )
            }}/>
            
            <Tab.Screen name="Diary" component={DiaryLists} options={{
                tabBarIcon:({focused})=>(
                    <TouchableOpacity>
                        {focused ?(
                            <FontAwesome name="book" size={24} color={Colors.main}/>
                        ):(<FontAwesome name="book" size={24} color={Colors.black}/>)}
                    </TouchableOpacity>
                )
            }}/>
            <Tab.Screen name="Firends" component={FriendsPage} options={{
                tabBarIcon:({focused})=>(
                    <TouchableOpacity>
                        {focused ?(
                            <FontAwesome5 name="users" size={24} color={Colors.main}/>
                        ):(<FontAwesome5 name="users" size={24} color={Colors.black}/>)}
                    </TouchableOpacity>
                )
            }}/>
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    tab:{
        elevation:0,
        backgroundColor:Colors.white,
        height:60,
    },
})

export default BottomNav