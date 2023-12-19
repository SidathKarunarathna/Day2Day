import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform, TextInputProps } from "react-native";
import Colors from "../../assets/color";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native"; 0
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


export default function CreateTask({ route }: any) {
    const [selectedPriority, setSelectedPriority] = useState();
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [mode, setmode] = useState('time');
    const [pickedTime, setPickedTime] = useState<string | null>('');
    const [date, setDate] = useState(new Date);

    const item = route.params
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;

    const showMode = ({ currentMode }: any) => {
        setShow(true);
        setmode(currentMode);
    }
    const onChange = ({ type }: any, selectedDate:any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        setPickedTime(tempDate.getHours() + ":" + tempDate.getMinutes());
        console.log(pickedTime)
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(item);
        })
        return unsubscribe
    }, [])
    const addTask = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'Tasks'), {
            date: item,
            description: description,
            time: pickedTime,
            priority: selectedPriority,
            completed:false,
            userId: FIREBASE_AUTH.currentUser?.uid
        })
        setDescription('');
        setDate(new Date());
        navigation.navigate('Calendar' as never);

    };

    return (

        <ScrollView style={styles.Container}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.section}>
                <Text style={styles.Header}>{item}</Text>
                <Text style={styles.SubTopic}>Description </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={(text: string) => {
                        if (text !== '') {
                          setDescription(text);
                        } else {
                          setDescription(null);
                        }
                      }}
                    value={description !== null ? description : ''} />
                <Text style={styles.SubTopic}>Time</Text>
                {show && (<DateTimePicker
                    display="default"
                    value={date}
                    mode="time"
                    is24Hour={true}
                    onChange={onChange}
                />)}
                <TouchableOpacity onPress={() => showMode('time')}>
                    <View style={styles.input}>
                        <TextInput style={{ color: Colors.main }}
                            placeholder="14:00"
                            onChangeText={(text: string) => {
                                if (text !== '') {
                                  setPickedTime(text);
                                } else {
                                  setPickedTime(null);
                                }
                              }}
                            value={pickedTime !== null ? pickedTime : ''}
                            editable={false} />
                        <View style={{ alignSelf: "flex-end", marginLeft: "90%", marginTop: -20 }}>
                            <Ionicons
                                name="time" size={25}
                                color={Colors.main} />
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={styles.SubTopic}>Priority </Text>
                <View style={styles.dropDown}><Picker style={{ color: Colors.main }}
                    selectedValue={selectedPriority}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedPriority(itemValue)
                    }>
                    <Picker.Item label="-Select Priority Level-" value=" " />
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                </Picker></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addTask()}>
                    <Text style={styles.buttonText}>SAVE</Text>
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
        marginTop: 250,
        borderRadius: 30,
        marginBottom: 32,

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