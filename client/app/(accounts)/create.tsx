import React from "react";
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { Router, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/AuthContext';


const { width, height } = Dimensions.get('window');

async function handleSignIn(first_name : string, last_name : string, street_name : string, street_number : string, city : string, state : string, zip : string, password : string, confirm_password : string, email : string) {
    try{
        const response = await fetch('http://10.22.236.99:4000/api/auth/register', 
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    first_name,
                    last_name,
                    street_name,
                    street_number,
                    city ,
                    state,
                    zip ,
                    password ,
                    confirm_password,
                    email,
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

async function trySignIN(router : Router, first_name : string, last_name : string, street_name : string, street_number : string, city : string, state : string, zip : string, password : string, confirm_password : string, email : string, setFirstNameValidation : Function, setLastNameValidation : Function, setStreetNumberValidation : Function, setStreetValidation : Function, setCityValidation : Function, setStateValidation : Function, setZipValidation : Function, setPassValidation : Function, setPassConfirmValidation : Function, setEmailValidation : Function, setLoggedIn : Function) {
    if(validateInputs(first_name, last_name, street_name, street_number, city, state, zip, password, confirm_password, email, setFirstNameValidation, setLastNameValidation, setStreetNumberValidation, setStreetValidation, setCityValidation, setStateValidation, setZipValidation, setPassValidation, setPassConfirmValidation, setEmailValidation)) {
        const user_id = await handleSignIn(first_name, last_name, street_name, street_number, city, state, zip, password, confirm_password, email); 
        if(user_id !== "Invalido" && user_id !== "Error") {
            setLoggedIn(user_id as string);
            router.navigate("/(tabs)");
        }
    }
}

function validateInputs(first_name : string, last_name : string, street_name : string, street_number : string, city : string, state : string, zip : string, password : string, confirm_password : string, email : string, setFirstNameValidation : Function, setLastNameValidation : Function, setStreetNumberValidation : Function, setStreetValidation : Function, setCityValidation : Function, setStateValidation : Function, setZipValidation : Function, setPassValidation : Function, setPassConfirmValidation : Function, setEmailValidation : Function) {
    let valid = true;
    console.log('Validating inputs');
    
    if(first_name === ''){
        setFirstNameValidation('First Name is required');
        valid = false;
    } else {
        setFirstNameValidation('');
    }
    
    if(last_name === ''){
        setLastNameValidation('Last Name is required');
        valid = false;
    } else {
        setLastNameValidation('');
    }
    
    if(street_number === ''){
        setStreetNumberValidation('A Street Number is required');
        valid = false;
    } else{
        setStreetNumberValidation('');
    }
    
    if(street_name === ''){
        setStreetValidation('A street is required');
        valid = false;
    } else {
        setStreetValidation('');
    }
    
    if(city === ''){
        setCityValidation('A city is required');
        valid = false;
    } else {
        setCityValidation('');
    }
    
    if(state.length !== 2){
        setStateValidation('A valid state is required');
        valid = false;
    } else {
        setStateValidation('');
    }
    
    if(zip.length !== 5){
        setZipValidation('A valid zip is required');
        valid = false;
    } else{
        setZipValidation('');
    }
    
    if (email === '') {
        setEmailValidation('An email is required');
        valid = false;
    } else {
        setEmailValidation('');
    }
    
    if(password.length < 8){
        setPassValidation('A valid password is required');
        setPassConfirmValidation('A valid password is required');
        valid = false;
    } else {
        setPassValidation('');
    }

    if(password !== confirm_password && password.length >= 8){
        setPassConfirmValidation('Passwords do not match');
        valid = false;
    } else if(password.length >= 8) {
        setPassConfirmValidation('');
    }
    return valid;
}

export default function CreateAccount() {
    const router = useRouter();
    const {setLoggedIn} = useAuth();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [passConfirm, setPassConfirm] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstNameValidation, setFirstNameValidation] = React.useState('');
    const [lastNameValidation, setLastNameValidation] = React.useState('');
    const [streetNumberValidation, setStreetNumberValidation] = React.useState('');
    const [cityValidation, setCityValidation] = React.useState('');
    const [streetValidation, setStreetValidation] = React.useState('');
    const [stateValidation, setStateValidation] = React.useState('');
    const [zipValidation, setZipValidation] = React.useState('');
    const [passValidation, setPassValidation] = React.useState('');
    const [passConfirmValidation, setPassConfirmValidation] = React.useState('');
    const [emailValidation, setEmailValidation] = React.useState('');

    return (
        <SafeAreaView style={{flex: 1, marginTop: 30}}>
            <ScrollView>
                <View
                    style={{display: "flex", paddingTop: 10, alignItems: 'center', backgroundColor: 'white', width: width, height: height}}
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
                                value={firstName}
                                placeholder=" "
                                onChangeText={setFirstName}
                            />
                        </View>
                        {firstNameValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{firstNameValidation}</Text>}
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
                                value={lastName}
                                placeholder=" "
                                onChangeText={setLastName}
                            />
                        </View>
                        {lastNameValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{lastNameValidation}</Text>}
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Street Number
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                inputMode="numeric"
                                style={CreateStyles.input}
                                value={street}
                                placeholder=" "
                                onChangeText={setStreet}
                            />
                        </View>
                        {streetNumberValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{streetNumberValidation}</Text>}
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
                                value={streetNumber}
                                placeholder=" "
                                onChangeText={setStreetNumber}
                            />
                        </View>
                        {streetValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{streetNumberValidation}</Text>}
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                City
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                style={CreateStyles.input}
                                value={city}
                                placeholder=" "
                                onChangeText={setCity}
                            />
                        </View>
                        {city !== '' && <Text style={{color: 'red', marginVertical:5}}>{cityValidation}</Text>}
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
                                value={state}
                                placeholder=" "
                                onChangeText={setState}
                                maxLength={2}
                            />
                        </View>
                        {stateValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{stateValidation}</Text>}
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
                                value={zip}
                                inputMode="numeric"
                                placeholder=" "
                                onChangeText={setZip}
                                maxLength={5}
                            />
                        </View>
                        {zipValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{zipValidation}</Text>}
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Password
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                secureTextEntry={true}
                                style={CreateStyles.input}
                                value={pass}
                                placeholder=" "
                                onChangeText={setPass}
                            />
                        </View>
                        {passValidation && <Text style={{color: 'red', marginVertical:5}}>{passValidation}</Text>}
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Confirm Password
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                secureTextEntry={true}
                                style={CreateStyles.input}
                                value={passConfirm}
                                placeholder=" "
                                onChangeText={setPassConfirm}
                            />
                        </View>
                        {passConfirmValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{passConfirmValidation}</Text>}
                    </View>
                    <View style={CreateStyles.viewInput}>
                        <View>
                            <Text style={CreateStyles.textHeader}>
                                Email
                            </Text>
                        </View>
                        <View style={CreateStyles.inputContainer}>
                            <TextInput
                                inputMode="email"
                                style={CreateStyles.input}
                                value={email}
                                placeholder=" "
                                onChangeText={setEmail}
                            />
                        </View>
                        {emailValidation !== '' && <Text style={{color: 'red', marginVertical:5}}>{emailValidation}</Text>}
                    </View>
                    <View style={CreateStyles.loginButton}>
                        <TouchableOpacity>
                            <Text onPress={() => trySignIN(router, firstName, lastName, street, streetNumber, city, state, zip, pass, passConfirm, email, setFirstNameValidation, setLastNameValidation, setStreetNumberValidation, setStreetValidation, setCityValidation, setStateValidation, setZipValidation, setPassValidation, setPassConfirmValidation, setEmailValidation, setLoggedIn)} style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight:'bold', padding: 15}}>
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
        marginVertical: "auto",
        width: width * 0.6,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 30,
        alignItems: 'center'
    },
    input: {
        marginVertical: "auto",
        textAlign: "left",
        fontSize: 20,
        paddingHorizontal: 20,
    },
    viewInput: {
        marginTop: 5,
        width: width
    }
})