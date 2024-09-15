import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import stockData from "@/mock/companyPrices.json"
import { Router, useRouter, Stack } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function realstateInvestment() {
    const calculatePercentageChange = (prices) => {
        const lastPrice = prices[prices.length - 1].price;
        const secondLastPrice = prices[prices.length - 2].price;
        const percentageChange = ((lastPrice - secondLastPrice) / secondLastPrice) * 100;
        return percentageChange.toFixed(2); // Redondea a 2 decimales
    };
    return (
        <>
        <Stack.Screen options={{ title: 'Real State'}} />
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
                <View>
                    <Text style={styles.textHeaders}>
                        Real State
                    </Text>
                </View>
            </View>
            <View>
                {stockData.data.slice(3, 6).map((stock, index) => (
                  <View key={index} elevation={5} style={styles.container}>
                    <View style={{ display: 'flex', justifyContent: 'space-between',flexDirection: 'row', width: '80%' }}>
                      <View>
                        <Text>{stock.name}</Text>
                        <Text>{stock.symbol}</Text>
                      </View>
                      <View style={styles.priceRow}>
                        {/* Mostrar el primer precio */}
                        <Text style={styles.price}>${stock.prices_last_20_days[0].price}</Text>
                        {/* Mostrar la diferencia porcentual calculada */}
                        <Text style={styles.porcentage}>{calculatePercentageChange(stock.           prices_last_20_days)}%</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View> 
        </View>
    </ParallaxScrollView>
    </>
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
        fontSize: 26,
        alignSelf: 'center',
        marginBottom: 20
    },
    pricesContainer: {
        marginTop: 10,
    },
    priceRow: {
      flexDirection: 'column',
    },
    date: {
      fontSize: 16,
    },
    price: {
      fontSize: 16,
      paddingBottom: 3
    },
    porcentage: { 
        fontSize: 14,
        paddingTop: 10
    },

  });