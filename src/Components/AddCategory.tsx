import React, { useState ,useEffect} from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform, TouchableOpacity ,FlatList} from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import Colors from '../../assets/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Query, addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const AddCategoryScreen = ({ navigation: nav }: any) => {
    const [ExpenseCategory, setExpenseCategory] = useState<string>('');
    const navigation = useNavigation();
    const [Categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();

     }, [nav])
    const addExpenseCategory = async () => {
        try {
            const doc = await addDoc(collection(FIRESTORE_DB, 'Expense Categories'),{
                category: ExpenseCategory,
                Uid:FIREBASE_AUTH.currentUser?.uid
              });
            alert('Expense Category added successfully!');
            setExpenseCategory('');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding Expense Category: ', error);
            alert('Failed to add Expense Category. Please try again.');
        }
    };
    const fetchCategories = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "Expense Categories"), where("Uid", "==", FIREBASE_AUTH.currentUser?.uid));
            const snapshot = await getDocs(q);

            const Categories: any[] = [];
            snapshot.forEach((doc) => {
                const CategoryData = doc.data();
                Categories.push({
                    id: doc.id,
                    category: CategoryData.category,
                });
            });
            console.log(Categories);
            setCategories(Categories);
        } catch (error) {
            console.error('Error fetching Expense Categories: ', error);
        }
    };
    const deleteCategory= async (item:any) => { 
        console.log(item);
        if (!item || !item.id) {
            console.error('Invalid item:', item);
            return;
        }
        const doc1 = await deleteDoc(doc(FIRESTORE_DB, 'Expense Categories',item.id));
        fetchCategories();
    };
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
                        <Text style={[styles.Header,{width:"80%",marginTop:40}]}>Expense Categories</Text>
                    </View>
                    <View style={styles.section2}>
                    <FlatList
                        data={Categories}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.iconsSection, styles.DiaryItem, styles.shadowProp]}>
                            <Text style={styles.SubTopic}>{item.category}</Text>
                            <TouchableOpacity  onPress={() =>deleteCategory(item)}>
                                    <FontAwesome5
                        
                                        name="trash" size={25}
                                        color={Colors.main} />
                                        </TouchableOpacity>
                          </View>
                        )} />
                </View>
                <Text style={styles.SubTopic}>Add More</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Category"
                    value={ExpenseCategory}
                    onChangeText={(text) => setExpenseCategory(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>addExpenseCategory()}>
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
        height: "60%"
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

export default AddCategoryScreen;
