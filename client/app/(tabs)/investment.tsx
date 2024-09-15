import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function InvestmentSceen() {
    const [apiValue, setApiValue] = useState(-10234.34);

    const getImageSource = () => {
        if (apiValue === null) {
            return require('@/assets/images/grey_line.png');
          }
          return apiValue > 0
            ? require('@/assets/images/green_arrow.jpg') 
            : require('@/assets/images/red_arrow.png');
    }
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#004878', dark: '#004878' }}
            headerImage={ 
              <Image source={require('@/assets/images/capitalonewhite.png')} style={styles.imageLogo}/>
            }
            headerText={
              <Text style={styles.clientName}>
                Hi, Imanol
              </Text>
            }
        >
            <View style={{width: width, height: height}}>
                <View style={{marginTop: 20}}>
                    <Text style={styles.textHeaders}>
                        Mi investments
                    </Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <View elevation={5} style={styles.boxContainer}>
                        <View style={{flex: 0.8, justifyContent: 'center'}}>
                            <Text style={styles.investmentText}>${apiValue}</Text>
                        </View>
                        <View style={{flex: 0.2, justifyContent: 'center',}}>
                            <Image source={getImageSource()} style={styles.investImage}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 30}}>
                    <Text style={styles.textHeaders}>
                        My options
                    </Text>
                </View>
                <View style={{alignItems: 'center', display: 'flex', flexDirection: 'column', height: 180, marginTop: 10}}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonDistribution}>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.optionsText}>Real State</Text>
                            </View>
                            <View style={{flex: 0.2}}>
                                <Image source={require('@/assets/images/right_arrow.png')} style={styles.optionsArrow}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonDistribution}>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.optionsText}>Tech Companies</Text>
                            </View>
                            <View style={{flex: 0.2}}>
                                <Image source={require('@/assets/images/right_arrow.png')} style={styles.optionsArrow}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonDistribution}>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.optionsText}>Commodities</Text>
                            </View>
                            <View style={{flex: 0.2}}>
                                <Image source={require('@/assets/images/right_arrow.png')} style={styles.optionsArrow}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <View>
                        <Text style={styles.textHeaders}>
                            Preferences - 
                        </Text>
                    </View>
                </View>
                <View>
                    <View elevation={5} style={styles.container}>
                        <View>
                            
                        </View>
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    )
}


const styles = StyleSheet.create({
    imageLogo : {
      width: 150,
      height: 65
    },
    clientName : {
      marginTop: 15,
      color: 'white',
      fontSize: 20,
    },
    container: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 325,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginTop: 10
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    investmentText: {
        padding: 10,
        fontSize: 18,
        
    },
    investImage: 
    {
        width: 50,
        height: 25,
    },
    buttonContainer: {
        display: 'flex',
        width: '80%', 
        height: 60, 
        backgroundColor: '#004878',
    },
    buttonDistribution: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60
    },
    optionsArrow: {
        width: 40,
        height: 25,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15
    },
    optionsText: {
        padding: 10,
        fontSize: 18,
        color: 'white',
        marginTop: 5
    },
    textHeaders: {
        fontSize: 22,
        paddingStart: '10%'
      }
  });
