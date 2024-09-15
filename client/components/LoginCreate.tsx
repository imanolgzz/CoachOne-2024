import React, { Dispatch } from "react";
import { useState } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import Checkbox from 'expo-checkbox';
import { SetStateAction } from "react";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface LoginProps {
    setLogedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginCreate({setLogedIn}: LoginProps) {
    // Login | Create    
    const [status, setStatus] = React.useState("Login");
    return (
        <>        
            {status == "Login" ? <Login setStatus={setStatus}/> : <CreateAccount setStatus={setStatus}/>}
        </>
    );
}

interface Props {
    setStatus: Function;
}

function Login({setStatus}: Props) {
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
                <Text onPress={() => router.navigate("./article")} style={{color: '#004878', fontSize: 16}}>
                    Sign in
                </Text>
            </View>
    </View> 
    )
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

function CreateAccount({setStatus}: Props) {
    const router = useRouter();
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [isChecked, setChecked] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, marginTop: 30}}>
            <ScrollView>
                <View
                    style={{display: "flex", paddingTop: 10, alignItems: 'flex-start',          backgroundColor: 'white', width: width, height: height, paddingStart: 10}}
                >
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                First Name
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={user}
                                placeholder=" "
                                onChangeText={setUser}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Last Name
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Street Number
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Street Name
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                State
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Zip
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Password
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View><View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Confirm Password
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                    </View>

                    <View style={CreateStyles.loginButton}>
                        <TouchableOpacity>
                            <Text onPress={() => console.log("\nUser: ", user, "\nPass: ",  pass)}   style={{alignSelf: 'center', color: 'white', fontSize: 20,  fontWeight:    'bold', padding: 15}}>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const CreateStyles = StyleSheet.create({
    textHeader : {
        fontSize: 18,
        fontWeight: 'bold',
        paddingStart: 10
    },
    inputContainer: {
        width: '90%',
        height: 50,
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: '#004878',
        borderRadius: 25,
        marginTop: 5
    },
    loginButton : {
        marginTop: 20,
        width: 200,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 30
    },
    input: {
        textAlign: "left",
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 20,
    },
    viewInput: {
        marginTop: 5,
        width: width
    }
})