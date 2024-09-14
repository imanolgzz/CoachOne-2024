import React from "react";
import { Link, Stack } from "expo-router";
import { useState } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

const { width, height } = Dimensions.get('window');

export default function CreateAccount() {

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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                First Name
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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                Last Name
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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                Street Number
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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                Street Name
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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                State
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
                    <View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                Zip
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
                    <View style={styles.viewInput}>
                        <View>
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
                    </View><View style={styles.viewInput}>
                        <View>
                            <Text style={styles.textHeader}>
                                Confirm Password
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

                    <View style={styles.loginButton}>
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


// first_name
// last_name
// street_number
// street_name
// state
// zip
// password
// confirm_password


const styles = StyleSheet.create({
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