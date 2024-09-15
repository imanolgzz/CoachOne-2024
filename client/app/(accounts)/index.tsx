import React from "react";
import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import Checkbox from 'expo-checkbox';
import { Router, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/AuthContext';

const { width, height } = Dimensions.get('window');

async function handleLoggin(user : string, pass: string) {
    try{
        const response = await fetch('http://10.22.236.99:4000/api/auth/login', 
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user,
                password: pass,
            }),
        });
        if(response.ok) {
            const data = await response.json();
            return data.user_id;
        }
        else {
            return "Invalido";
        }
    } catch (error) {
        console.error("Error: ", error);
        return "Error";
    }
}

async function tryLogIN(router : Router, setLoggedIn : Function, user : string, pass : string) {
    const user_id = await handleLoggin(user, pass);
    setLoggedIn(user_id as string | null);
    if(user_id !== "Invalido" && user_id !== "Error") {
        router.navigate("/(tabs)");
    }
}


export default function Login() {
    const router = useRouter();
    const { loggedIn, setLoggedIn } = useAuth();
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [isChecked, setChecked] = useState(false);
    console.log(loggedIn);

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
                <View style={loggedIn === "Invalido" ? LoginStyles.incorrectField : LoginStyles.inputContainer}>
                    <TextInput
                        inputMode="email"
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
                <View style={loggedIn === "Invalido" ? LoginStyles.incorrectField : LoginStyles.inputContainer}>
                    <TextInput
                        secureTextEntry={true}
                        style={LoginStyles.input}
                        value={pass}
                        placeholder=" "
                        onChangeText={setPass}
                    />
                </View>
            </View>
            <View style={{marginVertical: 10}}>
                {loggedIn === "Invalido" && <Text style={{color: 'red'}}>Usuario y/o contraseña incorrectos</Text>}
                {loggedIn === "Error" && <Text style={{color: 'red'}}>Hubo un error en el servicio porfavor intente de nuevo más tarde</Text>}
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
                <Checkbox value={isChecked} onValueChange={setChecked} style={{marginEnd: 5}} />
                <Text style={{fontWeight: 'bold',}}>
                    Remember me
                </Text>
            </View>
            <View style={LoginStyles.loginButton}>
                <TouchableOpacity style={{ display: "flex", width: 160, alignItems: 'center'}}>
                    <Text onPress={() => tryLogIN(router, setLoggedIn, user, pass)} style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', padding: 20}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 40, width: 100, height:100}}>
                <TouchableOpacity style={{width: 100, height: 100}}> 
                    <Text 
                        onPress={() => router.push("./create")} 
                        style={{color: '#004878', fontSize: 16, padding: 25}}>
                        Sign in
                    </Text>
                </TouchableOpacity>
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
        marginTop: 80,
        width: 160,
        height: 70,
        backgroundColor: 'red',
        borderRadius: 30
    },
    input: {
        marginVertical: 12,
        paddingHorizontal: 15,
        textAlign: "left",
        fontSize: 20,
    },
    incorrectField: {
        width: 250,
        height: 60,
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: 'red',
        borderRadius: 25,
        marginTop: 10,
    }
})