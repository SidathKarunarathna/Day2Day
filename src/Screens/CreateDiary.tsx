import { StyleSheet, Text, KeyboardAvoidingView, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Platform } from "react-native";
import Colors from "../../assets/color";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";


export default function CreateDiary({navigation:nav}:any) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [date, setDate] = useState(new Date);
    const [pageDate, setPageDate] = useState<String | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const richText = React.useRef(null);
    const [page, setPage] = useState<String | null>(null);
    const [happyFocused, setHappyFocused] = useState(false);
    const [normalFocused, setNormalFocused] = useState(false);
    const [cryFocused, setCryFocused] = useState(false);
    const [sadFocused, setSadFocused] = useState(false);
    const [key, setkey] = useState(new Date().getTime());
    const [lovelyFocused, setLovelyFocused] = useState(false);
    const [emoji, setEmoji] = useState<String | null>(null);
    const navigation = useNavigation();
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
            let imageData = `data:image/jpg;base64,${base64}`;
            richText.current.insertImage(imageData);
        }
    }
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
    const selectHappy = () => {
        setHappyFocused(!happyFocused);
        setNormalFocused(false);
        setCryFocused(false);
        setSadFocused(false);
        setLovelyFocused(false);
        setEmoji("Happy");
    };
    const selectNormal = () => {
        setHappyFocused(false);
        setNormalFocused(!normalFocused);
        setCryFocused(false);
        setSadFocused(false);
        setLovelyFocused(false);
        setEmoji("Normal");
    };
    const selectCry = () => {
        setHappyFocused(false);
        setNormalFocused(false);
        setCryFocused(!cryFocused);
        setSadFocused(false);
        setLovelyFocused(false);
        setEmoji("Tired");
    };
    const selectSad = () => {
        setHappyFocused(false);
        setNormalFocused(false);
        setCryFocused(false);
        setSadFocused(!sadFocused);
        setLovelyFocused(false);
        setEmoji("Sad");
    };
    const selectLovely = () => {
        setHappyFocused(false);
        setNormalFocused(false);
        setCryFocused(false);
        setSadFocused(false);
        setLovelyFocused(!lovelyFocused);
        setEmoji("Lovely");
    };
    const addPage = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'Diary'), {
            uid: FIREBASE_AUTH.currentUser?.uid,
            date: (date.getMonth()+1)+"/"+date.getDate()+"/"+ date.getFullYear(),
            emoji: emoji,
            data:page,
            day:days[date.getDay()],
        })
        
        //setkey(new Date().getTime());
        navigation.navigate("DiaryList");
    };
    useEffect(() => {
        const unsubscribe = nav.addListener('focus', () => {
        setHappyFocused(false);
        setNormalFocused(false);
        setCryFocused(false);
        setSadFocused(false);
        setLovelyFocused(false);
        setDate(new Date())
        setEmoji("");
        setPage("")
        richText.current?.setContentHTML(null);
        });
        return unsubscribe;
     }, [nav])
    return (
        <ScrollView>
            <View style={styles.Container}>
                <View style={styles.section2}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <TouchableOpacity style={{ alignSelf: "flex-end" }}
                         onPress={()=>navigation.navigate("DiaryList")}>
                            <Ionicons
                                name="close" size={35}
                                color={Colors.main} />
                        </TouchableOpacity>
                        <Text style={styles.Header}>Write</Text>
                        <TouchableOpacity style={{ alignSelf: "flex-end", marginLeft: "20%" }}
                        onPress={() => addPage()}>
                            <Ionicons
                                name="checkmark" size={40}
                                color={Colors.main} 
                                />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <View style={{ height: "auto" }} >
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
                                        <View style={{ alignSelf: "flex-end", marginLeft: "60%" }}>
                                            <Ionicons
                                                name="calendar" size={20}
                                                color={Colors.main} />
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>

                            <Text style={styles.SubTopic}>How was your day?</Text>
                            <View style={styles.iconsSection}>
                                <TouchableOpacity style={styles.icons}
                                    onPress={() => selectHappy()}>
                                    {happyFocused ? (
                                        <FontAwesome5
                                            name="smile" size={35}
                                            color={Colors.main} />
                                    ) : (<FontAwesome5
                                        name="smile" size={35}
                                        color={Colors.deepestGray} />)}

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.icons}
                                    onPress={() => selectNormal()}>
                                    {normalFocused ? (<FontAwesome5
                                        name="meh" size={35}
                                        color={Colors.main} />
                                    ) : (
                                        <FontAwesome5
                                            name="meh" size={35}
                                            color={Colors.deepestGray} />
                                    )}

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.icons}
                                    onPress={() => selectCry()}>
                                    {cryFocused ? (
                                        <FontAwesome5
                                            name="tired" size={35}
                                            color={Colors.main} />
                                    ) : (
                                        <FontAwesome5
                                            name="tired" size={35}
                                            color={Colors.deepestGray} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.icons}
                                    onPress={() => selectSad()}>
                                    {sadFocused ? (
                                        <FontAwesome5
                                            name="frown" size={35}
                                            color={Colors.main} />
                                    ) : (
                                        <FontAwesome5
                                            name="frown" size={35}
                                            color={Colors.deepestGray} />
                                    )}

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.icons}
                                    onPress={() => selectLovely()}>
                                    {lovelyFocused ? (
                                        <FontAwesome5
                                            name="grin-hearts" size={35}
                                            color={Colors.main} />
                                    ) : (
                                        <FontAwesome5
                                            name="grin-hearts" size={35}
                                            color={Colors.deepestGray} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ zIndex: 1000, height: "auto" }}>
                            <SafeAreaView  >
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
                                    <Text style={styles.SubTopic}>Write Here:</Text>
                                    <View style={{ borderColor: Colors.main, borderWidth: 1, backgroundColor: Colors.secondary }}>
                                        <RichToolbar
                                            editor={richText}
                                            actions={[
                                                actions.insertImage,
                                                actions.setBold,
                                                actions.setItalic,
                                                actions.insertBulletsList,
                                                actions.insertOrderedList,
                                                actions.insertLink,
                                                actions.keyboard,
                                                actions.setStrikethrough,
                                                actions.setUnderline,
                                                actions.undo,
                                                actions.redo
                                            ]}
                                            onPressAddImage={() => {
                                                pickImage();
                                            }}
                                            iconTint={Colors.main}
                                            selectedIconTint={Colors.deepGray}

                                        />
                                    </View>
                                    <RichEditor
                                        ref={richText}
                                        focusable
                                        onChange={descriptionText => {
                                            setPage(descriptionText);
                                            console.log(page)
                                        }}
                                    />
                                </KeyboardAvoidingView>


                            </SafeAreaView>
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.main,
    },
    Header: {
        marginLeft: 65,
        fontSize: 32,
        width: "40%",
        marginTop: 20,
        color: Colors.main,
        fontWeight: "bold",
        textAlign: "center"
    },
    SubTopic: {
        marginLeft: 10,
        fontSize: 16,
        width: "100%",
        marginTop: 20,
        color: Colors.main
    },
    SubTopic2: {
        marginRight: 10,
        fontSize: 20,
        marginTop: 30,
        color: Colors.main,
        textAlign: "right"
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
        height: "95%"
    },
    section2: {
        backgroundColor: Colors.lightDark,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
        flexDirection: "row"
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
        margin: 50,
        borderRadius: 30
    },
    iconsSection: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginLeft: 50,
    },
    icons: {
        margin: 10
    }
})