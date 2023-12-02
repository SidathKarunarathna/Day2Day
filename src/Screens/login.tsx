import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,KeyboardAvoidingView, ScrollView } from "react-native";
import Colors from "../../assets/color";
import { useEffect, useState } from "react";
import { tr } from "date-fns/locale";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user=>{
            if (user){
                navigation.navigate("Bottom");
            }
        })
        return unsubscribe
    },[])
    
    const auth = FIREBASE_AUTH;
    const signIn = async () =>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            if (response.user){
                console.log("Success");
            }
        }catch(error:any){
            console.log(error)
            alert('Login failed:'+error.message);
        }finally{
            setLoading(false);
        }
    }
    return (
        <ScrollView style={styles.Container}>
            <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
            <Image
                alt="Logo"
                style={styles.stretch}
                source={require("../../assets/Images/day2day1.png")} />
                <KeyboardAvoidingView behavior= "padding">
            <View style={styles.section}>
                <Text style={styles.Header}>LOGIN</Text>
                <Text style={styles.SubTopic}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text: String) => setEmail(text)}
                    value={email}></TextInput>
                <Text style={styles.SubTopic}>Password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text: String) => setPassword(text)}
                    value={password}></TextInput>
                <Text style={styles.LeftTopic}>Forgot Password?</Text>
                <TouchableOpacity onPress={()=>signIn()} style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text style={styles.LeftTopic}>Create New Account</Text>
                </TouchableOpacity>
                
            </View>
            </KeyboardAvoidingView>
            
        </ScrollView>
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
        marginTop: 20,
        alignItems: "center",
        textAlign: "center",
        color: Colors.main,
        fontWeight: "bold"
    },
    SubTopic: {
        marginLeft: 50,
        fontSize: 16,
        width: "100%",
        marginTop: 20,
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
        marginTop:50
    },
    section: {
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height:"80%"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
    },
    buttonText: {
        marginLeft: 0,
        fontSize: 24,
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        color: Colors.secondary,
        fontWeight: "bold",
        padding:10
    },
    button:{
        backgroundColor: Colors.main,
        margin:50,
        borderRadius:30
    },
    spinnerTextStyle: {
        color: '#FFF',
      }
})