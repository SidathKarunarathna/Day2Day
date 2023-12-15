import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../../assets/color';
import { useNavigation } from '@react-navigation/native';

export default function FriendsPage ()  {
  const [approvedFriends, setApprovedFriends] = useState<any[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchApprovedFriends();
  }, []);

  const fetchApprovedFriends = async () => {
    try {
      const userId = FIREBASE_AUTH.currentUser?.uid;
  
      // Check if the user ID exists
      if (!userId) {
        console.error('User ID not found.');
        return;
      }
      const userRef = doc(FIRESTORE_DB, 'Users', userId);
      const userDoc = await getDoc(userRef);
      // Check if the user document exists
      if (!userDoc.exists()) {
        console.log('User document does not exist.');
        return;
      }
      const friendsRef = collection(userRef, 'Friends', 'Approved');
      const snapshot = await getDocs(friendsRef);
  
      const friendsData: any[] = [];
      snapshot.forEach((doc) => {
        const friendData = doc.data();
        friendsData.push({
          id: doc.id,
          name: friendData.name,
          email: friendData.email,
        });
      });
      setApprovedFriends(friendsData);
    } catch (error) {
      console.error('Error fetching approved friends: ', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Approved Friends</Text>
      <FlatList
        data={approvedFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFriend' as never)}>
        <FontAwesome5
          name="user-plus" size={30}
          color={Colors.main} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingButton2}
        onPress={() => navigation.navigate('PendingFriends' as never)}>
        <FontAwesome5
          name="user-check" size={30}
          color={Colors.main} />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  friendContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
  },
  floatingButton: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.secondary,
    borderColor:Colors.main,
    borderWidth:2,
    borderRadius:50
  },
  floatingButton2: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 110,
    backgroundColor: Colors.secondary,
    borderColor:Colors.main,
    borderWidth:2,
    borderRadius:50
  }
});


