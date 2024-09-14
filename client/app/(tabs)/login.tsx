import React from "react";
import { Link, Stack } from "expo-router";
import { useState } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, Dimensions, TouchableOpacity} from "react-native";
import Checkbox from 'expo-checkbox';
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";

const { width, height } = Dimensions.get('window');

export default function Login() {
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [isChecked, setChecked] = useState(false);

    return (
        <View 
            style={{display: "flex", paddingTop: 150, paddingBottom: 20, alignItems: 'center', backgroundColor: 'white', width: width, height: height}}
        >
            <View>
                <View style={styles.logoImageContainer}>
                    <Image source={require('@/assets/images/Logo_Capital_One.png')} style={styles.logoImage}/>
                </View>
            </View>
            <View style={{alignItems: 'center', width: 700, height: 100, marginTop: 60}}>
                <View style={{marginStart: -200}}>
                    <Text style={styles.textHeader}>
                        User
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={user}
                        placeholder=" "
                        onChangeText={setUser}
                    />
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
                <View style={{marginStart: -150}}>
                    <Text style={styles.textHeader}>
                        Password
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
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
            <View style={styles.loginButton}>
                <TouchableOpacity>
                    <Text onPress={() => console.log("\nUser: ", user, "\nPass: ", pass)} style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', padding: 20}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 50}}>
                <Text onPress={() => {alert('but this is');}} style={{color: '#004878', fontSize: 16}}>
                    Sign in
                </Text>
            </View>
    </View> 
    )
}

const styles = StyleSheet.create({
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
        textAlign: "left",
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 20,
    }
})