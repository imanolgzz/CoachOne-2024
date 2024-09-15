import React from "react";
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CreateAccount() {
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
    );
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
        borderRadius: 30,
        alignItems: 'center'
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