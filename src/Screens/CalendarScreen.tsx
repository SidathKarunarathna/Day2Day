import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Colors from "../../assets/color";
import Checkbox from 'expo-checkbox';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";


export default function CalenderScreen({ navigation: nav }: any) {
  const [selected, setSelected] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date);
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelected(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
      console.log(selected);

    })
    fetchTasks();
    return unsubscribe
  }, [nav])
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const fetchTasks = async () => {
    try {
      const q = query(collection(FIRESTORE_DB, "Tasks"), where("userId", "==", FIREBASE_AUTH.currentUser?.uid));
      const snapshot = await getDocs(q);
      const Tasks: any[] = [];
      snapshot.forEach((doc) => {
        const Taskdata = doc.data();
        console.log(Taskdata);
        Tasks.push({
          id: doc.id,
          description: Taskdata.description,
          completed: Taskdata.completed,
          priority: Taskdata.priority,
          date: Taskdata.date,
          time: Taskdata.time
        });
      });

      setTasks(Tasks);
    } catch (error) {
      console.error('Error fetching approved friends: ', error);
    }
  };
  const handleRequest = async (requestID: string,check:boolean) => {
    try {
      setChecked
      const requestRef = doc(FIRESTORE_DB, "Tasks", requestID);
      console.log(requestID);
      await updateDoc(requestRef, { completed: !check });
      fetchTasks();
    } catch (error) {
      console.error('Error handling request: ', error);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.main, height: "100%" }}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        theme={{
          backgroundColor: Colors.main,
          calendarBackground: Colors.main,
          dayTextColor: Colors.secondary,
          selectedDayBackgroundColor: Colors.secondary,
          selectedDayTextColor: Colors.main,
          todayTextColor: Colors.deepGray,
          monthTextColor: Colors.secondary
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, dotColor: Colors.main }
        }}
      />
      <View style={styles.section}>
        <Text style={styles.Header}>Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View >
              {item.date === selected ? (<View style={{
                display: "flex",
                flexDirection: "row",
                borderColor: Colors.main,
                borderWidth: 1,
                marginLeft: 30,
                marginRight: 30,
                borderRadius: 30
              }}>
                <Text style={styles.SubTopic}>{item.description}</Text>
                <Checkbox style={styles.checkbox} value={item.completed} onValueChange={() => handleRequest(item.id,item.completed)} />
              </View>
              ) : (<View>
                <Text style={styles.SubTopic2}></Text>
              </View>)}

            </View>
          )} />
      </View>
      <TouchableOpacity style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateTask", selected)}>
        <FontAwesome5
          name="plus-circle" size={60}
          color={Colors.main} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.main,
  },
  checkbox: {
    margin: 20,
  },
  Header: {
    marginLeft: 0,
    fontSize: 24,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    textAlign: "center",
    color: Colors.main,
    fontWeight: "bold"
  },
  SubTopic: {
    marginLeft: 50,
    fontSize: 16,
    width: "60%",
    marginTop: 20,
    color: Colors.main
  }, SubTopic2: {
    fontSize: 20,
    color: Colors.main,
    textAlign: 'center'
  },
  LeftTopic: {
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    color: Colors.main,
    textDecorationLine: "underline"
  },
  stretch: {
    width: 231,
    height: 260,
    resizeMode: 'stretch',
    alignSelf: "center",
    marginTop: 50
  },
  section: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
    marginTop: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    borderColor: Colors.main,
    color: Colors.main,
  },
  buttonText: {
    marginLeft: 0,
    fontSize: 24,
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    color: Colors.secondary,
    fontWeight: "bold",
    padding: 10
  },
  button: {
    backgroundColor: Colors.main,
    margin: 50,
    borderRadius: 30
  }, floatingButton: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.secondary
  }
})