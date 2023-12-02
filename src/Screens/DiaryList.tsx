import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../assets/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB, firebase } from '../../firebaseConfig';
import { doc, getDoc, query, collection, where,getDocs } from 'firebase/firestore';




export default function DiaryLists() {
  const [lastName, setLastName] = useState<String | null>(null);
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
    
  }, []);
  const fetchData = async () => {
    const userID = FIREBASE_AUTH.currentUser?.uid;
    const q = query(collection(FIRESTORE_DB, "Diary"), where("uid", "==", FIREBASE_AUTH.currentUser?.uid))
    const querySnapshot = await getDocs(q);
      const diaryList = [];
        querySnapshot.forEach(doc => {
          
          diaryList.push({
            ...doc.data(),
            keys:doc.id,
          })
          console.log(doc.data().date);
          setData(diaryList);
    });
    
  }
  return (
    <View>
      <View style={styles.Container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.section}>
          <Text style={styles.Header}>Diary</Text>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(text: String) => setLastName(text)}
            value={lastName} />
          <View style={styles.Container2}>
            <FlatList
              numColumns={2}
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.DiaryItem, styles.shadowProp]}>
                  <Text style={styles.itemHeader}>{item.date}</Text>
                  <Text style={styles.ItemDate}>{item.day}</Text>
                  <View style={styles.icons}>
                    <FontAwesome5
                      name="smile" size={35}
                      color={Colors.main} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

        </View>
      </View>
      <TouchableOpacity style={styles.floatingButton}
        onPress={() => navigation.navigate("Diary")}>
        <FontAwesome5
          name="plus-circle" size={60}
          color={Colors.main} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.main,
  },
  Header: {
    marginLeft: 0,
    fontSize: 24,
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    textAlign: "center",
    color: Colors.main,
    fontWeight: "bold"
  },
  SubTopic: {
    marginLeft: 30,
    fontSize: 16,
    width: "100%",
    color: Colors.main
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
    display: 'flex'
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 35,
    marginRight: 35,
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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 30,
    marginBottom: 32
  },
  dropDown: {
    color: Colors.main,
    marginLeft: 30,
    marginRight: 30,
    borderColor: Colors.main,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 10
  }, spinnerTextStyle: {
    color: '#FFF',
  }, DiaryItem: {
    color: Colors.secondary,
    borderColor: Colors.main,
    //borderWidth:1,
    borderRadius: 30,
    width: "35%",
    height: 150,
    marginLeft: 30,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 6, //IOS
    backgroundColor: '#fff',
    elevation: 4,
    marginBottom: 10,
    overflow: 'hidden'
  }, shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 10,
  }, Container2: {
    flex: 1,
    paddingTop: 40,
    marginLeft: 15
  }, itemHeader: {
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.main
  }, ItemDate: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.main
  },
  icons: {
    alignSelf: 'center',
    marginTop: 20
  },
  floatingButton: {
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

