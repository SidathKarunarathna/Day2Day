import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../assets/color";

export default function Login() {
    return (
        <View style={styles.Container}>
            <Image
                alt="Logo"
                style={styles.stretch}
                source={require("../../assets/Images/day2day1.png")} />
            <View style={styles.section}>
                <Text style={styles.Header}>LOGIN</Text>
                <Text style={styles.SubTopic}>User Name </Text>
                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    keyboardType="numeric"></TextInput>
                <Text style={styles.SubTopic}>Password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    keyboardType="numeric"></TextInput>
                <Text style={styles.LeftTopic}>Forgot Password?</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.LeftTopic}>Create New Account</Text>
            </View>
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
        height:"100%"
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
    }
})