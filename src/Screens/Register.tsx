import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../assets/color";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";


export default function Register() {
    const [selectedGender, setSelectedGender] = useState()
    return (
        <View style={styles.Container}>
            <View style={styles.section}>
                <Text style={styles.Header}>Create New Account</Text>
                <Text style={styles.SubTopic}>First Name </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    keyboardType="numeric"></TextInput>
                <Text style={styles.SubTopic}>Last Name </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    keyboardType="numeric"></TextInput>
                <Text style={styles.SubTopic}>Email </Text>
                <TextInput
                    style={styles.input}
                    placeholder="John@mail.com"
                    keyboardType="numeric"></TextInput>
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
                    keyboardType="numeric"></TextInput>
                <Text style={styles.SubTopic}>Confirm Password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="***********"
                    secureTextEntry
                    keyboardType="numeric"></TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
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
        borderRadius: 30
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
    }
})