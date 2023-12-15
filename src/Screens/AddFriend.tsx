import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'; // Adjust the import paths as per your setup
import { getAuth } from 'firebase/auth'; // Import the authentication module
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../../assets/color';

export default function AddFriendsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const currentUser = FIREBASE_AUTH.currentUser;

    const handleSearch = async () => {
        try {
            if (!currentUser) {
                // User not logged in
                return;
            }

            const usersRef = collection(FIRESTORE_DB, 'Users');
            const q = query(usersRef, where('firstName', '>=', searchQuery)); // Modify this to suit your search criteria
            const querySnapshot = await getDocs(q);

            const results: any = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                console.log(userData)
                if (userData.uid !== currentUser?.uid) {
                    // Exclude current user from search results
                    results.push({
                        id: userData.userId,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                    });
                }
            });
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching for friends:', error);
        }
    };

    const sendFriendRequest = async (item:any) => {
        try {
            const friendRequestRef = addDoc(collection(FIRESTORE_DB, 'FriendReqests'), {
                senderId: currentUser?.uid,
                receiverId: item.id,
                firstName:item.firstName,
                lastname:item.lastName,
                status: 'pending'
            });
            console.log('Friend request sent successfully!');
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };


    return (
        <View style={styles.Container}>
            <View style={styles.section}>
                <Text style={styles.Header}>Add Friend</Text>
                <View style={styles.iconsSection}>
                    <TextInput
                        value={searchQuery}
                        style={styles.input}
                        onChangeText={(text) => setSearchQuery(text)}
                        placeholder="Search for friends"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleSearch()}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>


                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.iconsSection,styles.DiaryItem,styles.shadowProp]} >
                            <Text style={styles.SubTopic}>{item.firstName} {item.lastName}</Text>
                            <TouchableOpacity
                                
                                onPress={() => sendFriendRequest(item)}>
                                <FontAwesome5 name="user-plus" size={24} color={Colors.main} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.main,
    },
    Header: {
        marginLeft: 0,
        fontSize: 24,
        width: "100%",
        marginTop: 30,
        marginBottom: 20,
        alignItems: "center",
        textAlign: "center",
        color: Colors.main,
        fontWeight: "bold"
    },
    SubTopic: {
        marginLeft: 30,
        fontSize: 20,
        width: "73%",
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
        height: "100%"
    },
    input: {
        height: 40,
        width: "65%",
        borderWidth: 1,
        padding: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
        marginBottom: 5
    },
    buttonText: {
        marginLeft: 0,
        fontSize: 16,
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        color: Colors.secondary,
        fontWeight: "bold",
        padding: 10
    },
    button: {
        backgroundColor: Colors.main,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 32
    },
    buttonmini: {
        backgroundColor: Colors.main,
        borderRadius: 30,
        marginTop: 20,
        marginRight:10,
        marginBottom: 32,
        padding:5
    },
    buttonmini2: {
        backgroundColor: Colors.red,
        borderRadius: 30,
        marginTop: 20,
        marginRight:10,
        marginBottom: 32,
        padding:5
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
    },
    iconsSection: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
    },
    DiaryItem: {
        color: Colors.secondary,
        borderColor: Colors.main,
        //borderWidth:1,
        borderRadius: 30,
        width: "90%",
        height: 90,
        marginLeft: 15,
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
      }
})



