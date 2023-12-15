import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { Firestore, and, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';


export default function PendingRequestsPage() {
    const [pendingRequests, setPendingRequests] = useState<any[]>([]);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        try {
            const userId = FIREBASE_AUTH.currentUser?.uid;
            console.log(userId);
            const q = query(collection(FIRESTORE_DB, "FriendReqests"), where("receiverId", "==", FIREBASE_AUTH.currentUser?.uid));
            const snapshot = await getDocs(q);
            const friendsData: any[] = [];
            snapshot.forEach((doc) => {
                const friendData = doc.data();
                console.log(friendData);
                friendsData.push({
                    id: doc.id,
                    firstName: friendData.firstName,
                    lastName: friendData.lastName,
                });
            });
            setPendingRequests(friendsData);
        } catch (error) {
            console.error('Error fetching approved friends: ', error);
        }
    };

    const handleRequest = async (requestID: string, action: string) => {
        try {
            const requestRef = doc(FIRESTORE_DB, `Users/${FIREBASE_AUTH.currentUser?.uid}/FriendRequests`, requestID);

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
        <View style={styles.container}>
            <Text>Pending Friend Requests</Text>
            <FlatList
                data={pendingRequests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.requestContainer}>
                        <Text>User ID: {item.senderID}</Text>
                        <Button title="Accept" onPress={() => handleRequest(item.id, 'accept')} />
                        <Button title="Decline" onPress={() => handleRequest(item.id, 'decline')} />
                    </View>
                )}
            />
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
    requestContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
    },
});

//export default PendingRequestsPage;
