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
import { PieChart } from 'react-native-chart-kit';
import { YAxis,LineChart,Grid } from 'react-native-svg-charts';




export default function MonthlyReport({ navigation: nav }: any) {
    const [selected, setSelected] = useState('');
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [incomes, setIncomes] = useState<any[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncomes, setTotalIncomes] = useState<number>(0);
    const [totalExpensesByCategory, setTotalExpensesByCategory] = useState<any[]>([]);
    const [totalIncomesByCategory, setTotalIncomesByCategory] = useState<any[]>([]);
    const [colorPalette, setColorPalette] = useState<string[]>([
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ]);
    const [balanceData, setBalanceData] = useState<any[]>([]);
    const [monthDays, setMonthDays] = useState<any[]>([]);
    const [monthBalance, setMonthBalance] = useState<number[]>([]);
    const [monthIncome, setMonthIncome] = useState<number>(0);
    const [monthExpense, setMonthExpense] = useState<number>(0);
    const [uniqueChartData, setUniqueChartData] = useState<{ labels: string[]; datasets: { data: number[] }[] }>({
        labels: [],
        datasets: [{ data: [] }],
    });

    const fetchExpenses = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "Expenses"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid), orderBy("date"))
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
            const q = query(collection(FIRESTORE_DB, "Incomes"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid), orderBy("date"))
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

    const calculateTotalExpensesByCategory = () => {
        const expensesByCategory: { [category: string]: number } = {};
        expenses.forEach((expense: any) => {
            const expenseDate = expense.date.toDate();
            if (
                expenseDate.getMonth() + 1 === date.getMonth() + 1 &&
                expenseDate.getFullYear() === date.getFullYear()
            ) {
                const category = expense.category;
                expensesByCategory[category] = (expensesByCategory[category] || 0) + expense.amount;
            }
        });

        const data = Object.keys(expensesByCategory).map((category, index) => ({
            name: category,
            expenseAmount: expensesByCategory[category],
            color: colorPalette[index % colorPalette.length] // Assign color from colorPalette
        }));

        setTotalExpensesByCategory(data);
    };
    const calculateTotalIncomesByCategory = () => {
        const IncomesByCategory: { [category: string]: number } = {};
        incomes.forEach((income: any) => {
            const incomeDate = income.date.toDate();
            if (
                incomeDate.getMonth() + 1 === date.getMonth() + 1 &&
                incomeDate.getFullYear() === date.getFullYear()
            ) {
                const category = income.category;
                IncomesByCategory[category] = (IncomesByCategory[category] || 0) + income.amount;
            }
        });

        const data = Object.keys(IncomesByCategory).map((category, index) => ({
            name: category,
            incomeAmount: IncomesByCategory[category],
            color: colorPalette[index % colorPalette.length] // Assign color from colorPalette
        }));

        setTotalIncomesByCategory(data);
    };

    //const totalExpensesByCategory = calculateTotalExpensesByCategory();

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
            // console.log(incomeDate);
            //console.log(acc)
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
    }, [incomes, expenses])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelected(date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0'));
            //console.log(selected);
        })
        fetchExpenses();
        console.log("Expensess fetched");
        fetchIncomes();
        console.log("incomes fetched");
        calculateTotalExpensesByCategory();
        console.log("Expensess by category fetched");
        calculateTotalIncomesByCategory();
        console.log("incomes by category fetched");
        generateMonthDays();
        console.log("get months days fetched");
        calculateBalanceOverMonth();
        console.log("balances fetched");
        return unsubscribe
    }, [nav])
    useEffect(() => {
        //console.log(selected);
    }, [selected]);
    const generateMonthDays = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setMonthDays(daysArray);
    };

    const calculateBalanceOverMonth = () => {
        const monthBalanceArray: number[] = [];
        let currentBalance = 0;
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthDays.forEach((day) => {
            const totalDayExpense = expenses.reduce((acc, item) => {
                const expenseDate = item.date.toDate();
                if (
                    expenseDate.getDate() === day &&
                    expenseDate.getMonth() + 1 === date.getMonth() + 1 &&
                    expenseDate.getFullYear() === date.getFullYear()
                ) {
                    return acc + item.amount;
                }

                return acc;

            }, 0);
            const totalDayIncome = incomes.reduce((acc, item) => {
                const incomeDate = item.date.toDate();
                if (
                    incomeDate.getDate() === day &&
                    incomeDate.getMonth() + 1 === date.getMonth() + 1 &&
                    incomeDate.getFullYear() === date.getFullYear()
                ) {
                    return acc + item.amount;
                }

                return acc;
            }, 0);
            currentBalance += totalDayIncome - totalDayExpense;

            monthBalanceArray.push(currentBalance);
            setMonthIncome(prev => prev + totalDayIncome);
            setMonthExpense(prev => prev + totalDayExpense);
        });
        //console.log(monthBalanceArray);
        setMonthBalance(monthBalanceArray);
        console.log(monthBalance)
    };


    const chartData = {
        labels: monthDays.map(String),
        datasets: [{ data: monthBalance }]
    };
    useEffect(() => {
        const updatedChartData = { ...uniqueChartData };
        monthBalance.forEach((balance: number, index: number) => {
            // Check if the current balance is different from the previous one or it's the first element
            if (index === 0 || balance !== monthBalance[index - 1]) {
                updatedChartData.labels.push(monthDays[index].toString()); // Add the day to labels
                updatedChartData.datasets[0].data.push(balance); // Add the balance to data
            }
        });
        setUniqueChartData(updatedChartData);
    }, [monthBalance, monthDays]);
    const labels = ['1', '', '', '', '5', '', '', '', '10', '', '', '', '15', '', '', '', '20', '', '', '', '25', '', '', '', '30'];
    const yLabels = [...new Set(monthBalance.filter(value => value !== 0))];
    const contentInset = { top: 20, bottom: 20 }
    return (
        <View style={styles.Container}>
            <View style={styles.section}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Text style={styles.Header}>Monthly Report</Text>
                    <TouchableOpacity style={{ alignSelf: "flex-end", marginLeft: "12%" }}
                        onPress={() => {
                            fetchExpenses();
                            fetchIncomes();
                            calculateTotalExpensesByCategory();
                            calculateTotalIncomesByCategory();
                            generateMonthDays();
                            calculateBalanceOverMonth();
                        }}>
                        <Ionicons
                            name="refresh" size={40}
                            color={Colors.main}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Text style={[styles.SubTopic4]}>EXPENSES</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('monthlyExpenses' as never)}
                        style={styles.Container3}>
                        <Text style={styles.SubTopic3}>{`Rs.${totalExpenses}.00`}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.SubTopic4]}>INCOMES</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('monthlyIncomes' as never)}
                        style={styles.Container3}>
                        <Text style={styles.SubTopic3}>{`Rs.${totalIncomes}.00`}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.SubTopic4]}>BALANCE</Text>
                    {totalBalance < 0 ? (<TouchableOpacity style={[styles.Container2, { backgroundColor: Colors.red }]}>
                        <Text style={styles.SubTopic3}>{`Rs.${totalBalance}.00`}</Text>
                    </TouchableOpacity>) : (<TouchableOpacity style={styles.Container2}>

                        <Text style={styles.SubTopic3}>{`Rs.${totalBalance}.00`}</Text>
                    </TouchableOpacity>)}
                    <Text style={[styles.SubTopic4]}>Expenses By Category</Text>
                    {totalExpensesByCategory.length > 0 ? (
                        <PieChart
                            data={totalExpensesByCategory}
                            width={350}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: Colors.main,
                                backgroundGradientTo: Colors.secondary,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                strokeWidth: 2 // optional, default 3
                            }}
                            accessor="expenseAmount"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    ) : (
                        <Text>No data available</Text>
                    )}
                    <Text style={[styles.SubTopic4]}>Incomes By Category</Text>
                    {totalIncomesByCategory.length > 0 ? (
                        <PieChart
                            data={totalIncomesByCategory}
                            width={350}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: Colors.main,
                                backgroundGradientTo: Colors.secondary,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                strokeWidth: 2 // optional, default 3
                            }}
                            accessor="incomeAmount"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    ) : (
                        <Text>No data available</Text>
                    )}

                    <Text style={[styles.SubTopic4]}>Balance over Month</Text>

                    {chartData.datasets.length > 0 ? (
                   <View style={{ height: 200, padding: 20 ,marginBottom:100 }}>
                    <View style={{ height: 200, flexDirection: 'row' }}>
                     <YAxis
                    data={monthBalance}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `RS.${value}`}
                />
                   <LineChart
                     style={{ flex: 1 }}
                     data={monthBalance}
                     svg={{ stroke: 'rgb(0, 0, 139)',strokeWidth:3 }}
                     contentInset={{ top: 20, bottom: 20 }}
                     xAccessor={({ index }) => index}
                     yAccessor={({ item }) => item}
                     animate
                     
                   >
                     <Grid />
                   </LineChart>
                   </View>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginLeft:40 }}>
                     {labels.map((label, index) => (
                       <Text key={index} style={{ textAlign: 'center' }}>
                         {label}
                       </Text>
                     ))}
                   </View>
          
                 </View>): (
                        <Text>No data available</Text>
                    )}
                </ScrollView>
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
    chart: {
        margin: 18,
        borderRadius: 16

    },
    Container3: {
        backgroundColor: Colors.deepGray,
        height: 70,
        margin: 20,
        borderRadius: 50
    },
    Header: {
        marginLeft: 100,
        fontSize: 24,
        width: "43%",
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