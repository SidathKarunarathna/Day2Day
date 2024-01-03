import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import Colors from '../../assets/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';

const AddIncomeScreen = ({ navigation: nav }: any) => {
    const [Income, setIncome] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pageDate, setPageDate] = useState<String | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const navigation = useNavigation();
   
    useEffect(() => {
        setPageDate(date.toDateString())
     }, [nav])
    const addIncome = async () => {
        try {
            const doc = await addDoc(collection(FIRESTORE_DB, 'Incomes'),{
                amount: Income,
                description,
                date,
                Uid:FIREBASE_AUTH.currentUser?.uid
              });
              
            alert('Income added successfully!');
            setIncome(0);
            setDescription('');
            navigation.goBack()
        } catch (error) {
            console.error('Error adding Income: ', error);
            alert('Failed to add Income. Please try again.');
        }
    };
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setPageDate(currentDate.toDateString());
            }
        }
        else {
            toggleDatePicker();
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.section}>
            <View style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <TouchableOpacity style={{ alignSelf: "flex-end" }}
                         onPress={()=>navigation.goBack()}>
                            <Ionicons
                                name="close" size={35}
                                color={Colors.main} />
                        </TouchableOpacity>
                        <Text style={[styles.Header,{width:"80%",marginTop:40}]}>Add Income</Text>
                    </View>
            <Text style={styles.SubTopic}>Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Amount"
                    value={Income.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        if(text===''){
                            setIncome(0)
                        }else{setIncome(parseInt(text))}
                        }}
                />
                <Text style={styles.SubTopic}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <View>
                    <Text style={styles.SubTopic}>Date</Text>
                    {showPicker && (<DateTimePicker mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChange}
                    />)}
                    <TouchableOpacity onPress={toggleDatePicker}>
                        <View style={styles.input}>
                            <TextInput style={{ color: Colors.main }}
                                placeholder="Sat Aug 21 2023"
                                onChangeText={(text: String) => setPageDate(text)}
                                value={pageDate}
                                editable={false} />
                            <View style={{ alignSelf: "flex-end", marginLeft: "60%",marginTop:-20 }}>
                                <Ionicons
                                    name="calendar" size={20}
                                    color={Colors.main} />
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>addIncome()}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
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
    section2: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "100%"
    },
    input: {
        height: 40,
        width: "80%",
        borderWidth: 1,
        padding: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
        marginBottom: 30,
        marginTop:10
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
        margin: 30,
       
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
})

export default AddIncomeScreen;
