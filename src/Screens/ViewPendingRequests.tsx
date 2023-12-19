import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { Firestore, and, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Colors from '../../assets/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function PendingRequestsPage({navigation:nav}:any) {
    const [pendingRequests, setPendingRequests] = useState<any[]>([]);

    useEffect(() => {
        fetchPendingRequests();
    }, [nav]);

    const fetchPendingRequests = async () => {
        try {
            const userId = FIREBASE_AUTH.currentUser?.uid;
            const q = query(collection(FIRESTORE_DB, "FriendReqests"), where("receiverId", "==", FIREBASE_AUTH.currentUser?.uid));
            const snapshot = await getDocs(q);
            const friendsData: any[] = [];
            snapshot.forEach((doc) => {
                const friendData = doc.data();
                console.log(friendData);
                friendsData.push({
                    id: doc.id,
                    firstName: friendData.firstName,
                    lastName: friendData.lastname,
                    status:friendData.status
                });
            });
            console.log(friendsData)
            setPendingRequests(friendsData);
        } catch (error) {
            console.error('Error fetching approved friends: ', error);
        }
    };

    const handleRequest = async (requestID: string, action: string) => {
        try {
            const requestRef = doc(FIRESTORE_DB, "FriendReqests", requestID);
            console.log(requestID);
            if (action === 'accept') {
                await updateDoc(requestRef, { status: 'accepted' });
                // Logic to add senderID to current user's friend list
            } else if (action === 'decline') {
                await updateDoc(requestRef, { status: 'declined' });
            }

            // Refresh pending requests list after action
            fetchPendingRequests();
        } catch (error) {
            console.error('Error handling request: ', error);
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.section}>
                <Text style={styles.Header}>Pending Friend Requests</Text>
                <FlatList
                    data={pendingRequests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            {(item.status === 'pending')?(
                                <View style={[styles.iconsSection, styles.DiaryItem, styles.shadowProp]}>
                            <Text style={styles.SubTopic}>{item.firstName} {item.lastName}</Text>
                            <TouchableOpacity
                                onPress={() => handleRequest(item.id, 'accept')}>
                                <FontAwesome5 name="user-check" size={24} color={Colors.main} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{margin:20}}
                                onPress={() => handleRequest(item.id, 'decline')}>
                                <FontAwesome5 name="user-times" size={24} color={Colors.red} />
                            </TouchableOpacity></View>):(<View style={{alignItems:'center',marginTop:300}}><Text style={styles.SubTopic}>No Pending Requests</Text></View>)}
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
        width: "60%",
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
        marginRight: 10,
        marginBottom: 32,
        padding: 5
    },
    buttonmini2: {
        backgroundColor: Colors.red,
        borderRadius: 30,
        marginTop: 20,
        marginRight: 10,
        marginBottom: 32,
        padding: 5
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
});

//export default PendingRequestsPage;
