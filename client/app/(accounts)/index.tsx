import React from "react";
import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [isChecked, setChecked] = useState(false);

    return (
        <View 
            style={{display: "flex", paddingTop: 150, paddingBottom: 20, alignItems: 'center', backgroundColor: 'white', width: width, height: height}}
        >
            <View>
                <View style={LoginStyles.logoImageContainer}>
                    <Image source={require('@/assets/images/Logo_Capital_One.png')} style={LoginStyles.logoImage}/>
                </View>
            </View>
            <View style={{alignItems: 'center', width: 700, height: 100, marginTop: 60}}>
                <View style={{marginStart: -200}}>
                    <Text style={LoginStyles.textHeader}>
                        User
                    </Text>
                </View>
                <View style={LoginStyles.inputContainer}>
                    <TextInput
                        style={LoginStyles.input}
                        value={user}
                        placeholder=" "
                        onChangeText={setUser}
                    />
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
                <View style={{marginStart: -150}}>
                    <Text style={LoginStyles.textHeader}>
                        Password
                    </Text>
                </View>
                <View style={LoginStyles.inputContainer}>
                    <TextInput
                        style={LoginStyles.input}
                        value={pass}
                        placeholder=" "
                        onChangeText={setPass}
                    />
                </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                <Checkbox value={isChecked} onValueChange={setChecked} style={{marginEnd: 5}} />
                <Text style={{fontWeight: 'bold',}}>
                    Remember me
                </Text>
            </View>
            <View style={LoginStyles.loginButton}>
                <TouchableOpacity>
                    <Text onPress={() => console.log("\nUser: ", user, "\nPass: ", pass)} style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', padding: 20}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 50}}>
                <Text onPress={() => router.push("./create")} style={{color: '#004878', fontSize: 16}}>
                    Sign in
                </Text>
            </View>
    </View> 
    );
}

const LoginStyles = StyleSheet.create({
    logoImageContainer : {
        width: 250,
        height: 90
    },
    logoImage: {
        width: '100%',
        height: '100%'
    },
    textHeader : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: 250,
        height: 60,
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: '#004878',
        borderRadius: 25,
        marginTop: 10
    },
    loginButton : {
        marginTop: 100,
        width: 160,
        height: 70,
        backgroundColor: 'red',
        borderRadius: 30
    },
    input: {
        margin: "auto",
        padding: "auto",
        textAlign: "left",
        fontSize: 20,
    }
})