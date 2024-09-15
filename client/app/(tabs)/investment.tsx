import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function InvestmentSceen() {
    const [apiValue, setApiValue] = useState(10234.34);

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
            <View style={{width: width, height: height, flex: 1}}>
                <View>
                    <Text>
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
      flex: 1,
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        height: '25%',
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
    }
  });
