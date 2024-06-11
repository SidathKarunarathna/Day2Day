import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import Colors from "../../assets/color";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";


export default function Register() {
    const [selectedGender, setSelectedGender] = useState();
    const [firstName, setFirstName] = useState<String | null>(null);
    const [lastName, setLastName] = useState<String | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Bottom' as never);
            }
        })
        return unsubscribe
    }, [])
    const register = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            if (response.user) {
                await addUser(response);
            }
        } catch (error: any) {
            console.log(error)
            alert('Login failed:' + error.message);
        } finally {
            setLoading(false);
        }
    }
    const addUser = async (response: any) => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'Users'), {
            firstName: firstName,
            lastName: lastName,
            gender: selectedGender,
            userId: response.user.uid
        })
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    return (

        <ScrollView style={styles.Container}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.section}>
                <Text style={styles.Header}>Create New Account</Text>
                <Text style={styles.SubTopic}>First Name </Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(text: string) => setFirstName(text)}
                    value={firstName as string | undefined}
                />
                <Text style={styles.SubTopic}>Last Name </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={(text: string) => setLastName(text)}
                    value={lastName as string | undefined}
                />
                <Text style={styles.SubTopic}>Email </Text>
                <TextInput
                    style={styles.input}
                    placeholder="John@mail.com"
                    onChangeText={(text: string) => setEmail(text)}
                    value={email}
                />
                <Text style={styles.SubTopic}>Gender </Text>
                <View style={styles.dropDown}><Picker style={{ color: Colors.main }}
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                        
                    }>
                    <Picker.Item label="-Select Gender-" value=" " />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker></View>
                <Text style={styles.SubTopic}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="***********"
                    secureTextEntry
                    onChangeText={(text: string) => setPassword(text)}
                    value={password}
                />
                <Text style={styles.SubTopic}>Confirm Password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="***********"
                    secureTextEntry
                    onChangeText={(text: string) => setConPassword(text)}
                    value={conPassword as string | undefined}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => register()}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
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