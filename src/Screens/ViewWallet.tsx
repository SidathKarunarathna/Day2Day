import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import Colors from '../../assets/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

export default function ViewWalletScreen({navigation:nav}:any){
  const [expenses, setExpenses] = useState<any[]>([]);
  const [incomes, setIncomes] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [nav]);

  const fetchExpenses = async () => {
    try {
        const q = query(collection(FIRESTORE_DB, "Expenses"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid))
      const querySnapshot = await getDocs(q);
      const expense:any = [];
      querySnapshot.forEach(doc => {
  
        expense.push({
          ...doc.data(),
          keys: doc.id,
        })
        console.log(expense)
        setExpenses(expense);
      });      
    } catch (error) {
      console.error('Error fetching expenses: ', error);
    }
  };

  const fetchIncomes = async () => {
    try {
        const q = query(collection(FIRESTORE_DB, "Incomes"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid))
      const querySnapshot = await getDocs(q);
      const Income:any = [];
      querySnapshot.forEach(doc => {
  
        Income.push({
          ...doc.data(),
          keys: doc.id,
        })
        console.log(Income)
        setIncomes(Income);
      });      
    } catch (error) {
      console.error('Error fetching Incomes: ', error);
    }
  };

  useEffect(() => {
    const expensesTotal = expenses.reduce((acc, item) => acc + item.amount, 0);
    const incomesTotal = incomes.reduce((acc, item) => acc + item.amount, 0);
    const balance = incomesTotal - expensesTotal;
    setTotalBalance(balance);
  }, [expenses, incomes]);
  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
        <View style={styles.section}>
        <Text style={styles.Header}>Wallet</Text>
        <View style={styles.iconsSection}>
        <Text style={styles.SubTopic}>Expenses</Text>
        <TouchableOpacity 
        onPress={() => navigation.navigate("AddExpense" as never)}>
        <FontAwesome5
          name="plus-circle" size={30}
          color={Colors.main} />
      </TouchableOpacity>
        </View>
        <View style={[styles.iconsSection,{borderBottomWidth:2,borderBottomColor:Colors.main}]} >
        <Text style={[styles.expense,{width:"20%"}]}>Date</Text>
            <Text style={[styles.expense,{width:"30%"}]}>Description</Text>
            <Text style={[styles.expense,{width:"30%"}]}>Amount</Text>
        </View>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.iconsSection}>
            <Text style={[styles.expense,{width:"20%"}]}>{` ${item.date.toDate().toDateString()}`}</Text>
            <Text style={[styles.expense,{width:"30%"}]}>{` ${item.description}`}</Text>
            <Text style={[styles.expense,{width:"30%"}]}>{`RS.${item.amount}`}</Text>
            
            
          </View>
        )}
      />
      <View style={styles.iconsSection}>
      <Text style={styles.SubTopic}>Incomes</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate("AddIncome" as never)}>
        <FontAwesome5
          name="plus-circle" size={30}
          color={Colors.main} />
      </TouchableOpacity>
      </View>
      <View style={[styles.iconsSection,{borderBottomWidth:2,borderBottomColor:Colors.main}]} >
        <Text style={[styles.expense,{width:"20%"}]}>Date</Text>
            <Text style={[styles.expense,{width:"30%"}]}>Description</Text>
            <Text style={[styles.expense,{width:"30%"}]}>Amount</Text>
        </View>
      <FlatList
        data={incomes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.iconsSection]}>
            <Text style={[styles.expense,{width:"20%"}]}>{` ${item.date.toDate().toDateString()}`}</Text>
            <Text style={[styles.expense,{width:"30%"}]}>{` ${item.description}`}</Text>
            <Text style={[styles.expense,{width:"30%"}]}>{`Rs.${item.amount}`}</Text>
          </View>
        )}
      />
      <View style={styles.Container}>
      <Text style={styles.SubTopic2}>{`Total Balance:       Rs.${totalBalance}.00`}</Text>
      </View>
      
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
        color: Colors.main,
        fontWeight:'bold'
    },
    SubTopic2: {
        marginLeft: 30,
        fontSize: 20,
        width: "73%",
        color: Colors.white,
        height:70,
        marginTop:30,
        fontWeight:'bold'
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
        marginLeft: 20,
        marginRight:20
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
      },expense:{
color:Colors.main,
fontSize:16,
marginLeft:20,
marginRight:20,
marginTop:20
      }
})


