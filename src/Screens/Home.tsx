import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import Colors from "../../assets/color";
import { addDoc, collection, getDoc, doc, query, where, getDocs, orderBy } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


export default function Home({ navigation: nav }: any) {
    const [selected, setSelected] = useState('');
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date);
    const [tasks, setTasks] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [incomes, setIncomes] = useState<any[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncomes, setTotalIncomes] = useState<number>(0);


    const fetchExpenses = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "Expenses"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid),orderBy("date"))
            const querySnapshot = await getDocs(q);
            const expense: any = [];
            querySnapshot.forEach(doc => {

                expense.push({
                    ...doc.data(),
                    keys: doc.id,
                })
                //console.log(expense)
                
            });
            setExpenses(expense);
        } catch (error) {
            console.error('Error fetching expenses: ', error);
        }
    };

    const fetchIncomes = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "Incomes"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid),orderBy("date"))
            const querySnapshot = await getDocs(q);
            const Income: any = [];
            querySnapshot.forEach(doc => {

                Income.push({
                    ...doc.data(),
                    keys: doc.id,
                })
                //console.log(Income)
                
            });
            setIncomes(Income);
        } catch (error) {
            console.error('Error fetching Incomes: ', error);
        }
    };

    useEffect(() => {
        const expensesTotal = expenses.reduce((acc, item) => {
            const expenseDate = item.date.toDate();
            if (
                expenseDate.getMonth() + 1 === date.getMonth() + 1 &&
                expenseDate.getFullYear() === date.getFullYear()
            ) {
                return acc + item.amount;
            }

            return acc;

        }, 0);
        setTotalExpenses(expensesTotal);
        const incomesTotal = incomes.reduce((acc, item) => {
            const incomeDate = item.date.toDate();
            console.log(incomeDate);
            console.log(acc)
            if (
                incomeDate.getMonth() + 1 === date.getMonth() + 1 &&
                incomeDate.getFullYear() === date.getFullYear()
            ) {
                return acc + item.amount;
            }

            return acc;
        }, 0);
        setTotalIncomes(incomesTotal);
        const balance = incomesTotal - expensesTotal;
        setTotalBalance(balance);
    }, [incomes,expenses])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelected(date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0'));
            console.log(selected);
        })
        fetchTasks();
        fetchExpenses();
        fetchIncomes();
        return unsubscribe
    }, [nav])
    useEffect(() => {
        console.log(selected);
    }, [selected]);
    const fetchTasks = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "Tasks"), where("userId", "==", FIREBASE_AUTH.currentUser?.uid), orderBy("time"));
            const snapshot = await getDocs(q);

            const Tasks: any[] = [];
            snapshot.forEach((doc) => {
                const Taskdata = doc.data();
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
    return (
        <View style={styles.Container}>
            <View style={styles.section}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Text style={styles.Header}>Home</Text>
                    <TouchableOpacity style={{ alignSelf: "flex-end", marginLeft: "20%" }}
                        onPress={() => {
                            fetchExpenses();
                            fetchIncomes();
                            fetchTasks();
                        }}>
                        <Ionicons
                            name="refresh" size={40}
                            color={Colors.main}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.section2}>
                    <Text style={[styles.SubTopic, { borderBottomWidth: 2, borderBottomColor: Colors.main, marginBottom: 10 }]}>TODAY LINEUP</Text>
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
                                    borderRadius: 30,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    marginBottom: 10
                                }}>
                                    <Text style={styles.SubTopic4}>{item.description}</Text>
                                    <Text style={[styles.SubTopic4]}>{item.time}</Text>
                                </View>
                                ) : (<View>
                                    <Text style={styles.SubTopic2}></Text>
                                </View>)}

                            </View>
                        )} />
                </View>
                <Text style={[styles.SubTopic, { borderBottomWidth: 2, borderBottomColor: Colors.main, marginBottom: 10 }]}>THIS MONTH SUMMERY</Text>
                <Text style={[styles.SubTopic4]}>EXPENSES</Text>
                <TouchableOpacity  
                 onPress={() => navigation.navigate('monthlyExpenses' as never)}
                style={styles.Container3}>
                    <Text style={styles.SubTopic3}>{`Rs.${totalExpenses}.00`}</Text>
                </TouchableOpacity>
                <Text style={[styles.SubTopic4]}>INCOMES</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('monthlyIncomes' as never)}
                style={styles.Container3}>
                    <Text style={styles.SubTopic3}>{`Rs.${totalIncomes}.00`}</Text>
                </TouchableOpacity>
                <Text style={[styles.SubTopic4]}>BALANCE</Text>
                {totalBalance<0?(<TouchableOpacity style={[styles.Container2,{backgroundColor:Colors.red}]}>
      <Text style={styles.SubTopic3}>{`Rs.${totalBalance}.00`}</Text>
      </TouchableOpacity>):(<TouchableOpacity style={styles.Container2}>

      <Text style={styles.SubTopic3}>{`Rs.${totalBalance}.00`}</Text>
      </TouchableOpacity>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.main,
    },
    Container2: {
        backgroundColor: Colors.main,
        height: 70,
        margin: 20,
        borderRadius: 50
    },
    Container3: {
        backgroundColor: Colors.deepGray,
        height: 70,
        margin: 20,
        borderRadius: 50
    },
    Header: {
        marginLeft: 130,
        fontSize: 24,
        width: "30%",
        marginTop: 30,
        marginBottom: 20,
        alignItems: "center",
        textAlign: "center",
        color: Colors.main,
        fontWeight: "bold",
    },
    SubTopic: {
        marginLeft: 30,
        fontSize: 20,
        width: "85%",
        color: Colors.main
    },
    SubTopic2: {
        fontSize: 20,
        color: Colors.main,
        textAlign: 'center',
        display: "none"
    },
    SubTopic3: {
        fontSize: 32,
        color: Colors.white,
        textAlign: 'center',
        marginTop: 18,
        fontWeight: "bold"
    },
    SubTopic4: {
        marginLeft: 30,
        fontSize: 20,
        width: "60%",
        color: Colors.main,
        fontWeight: "bold"
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
        height: "25%"
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
    }, expense: {
        color: Colors.main,
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5
    }
})