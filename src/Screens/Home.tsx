import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import Colors from "../../assets/color";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";


export default function Home({ user }: any) {
    const [firstName, setFirstName] = useState<String | null>(null);
   

    return (
        <View>
            <Text>{FIREBASE_AUTH.currentUser?.email}</Text>
        </View>
    );
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
        marginBottom: 50,
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
        height: "100%"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
        marginBottom: 20
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
    }
})