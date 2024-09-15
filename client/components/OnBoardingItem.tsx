import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');


export default function OnBoardingItem({item} : any) {

  // Obtén los datos de precios del último y penúltimo día
  const lastPrice = item.prices_last_20_days[item.prices_last_20_days.length - 1].price;
  const secondLastPrice = item.prices_last_20_days[item.prices_last_20_days.length - 2].price;

  // Calcula el cambio en porcentaje
  const percentageChange = ((lastPrice - secondLastPrice) / secondLastPrice) * 100;

  return (
    <View style={{width: 325}}>
        <View style={styles.container}>
          <View style={styles.infoRow}>
            <Text style={styles.company}>{item.name}</Text>
            <Text>{item.symbol}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}><Text style={{fontWeight: "bold"}}>Price: $ </Text>{lastPrice.toFixed(2)}</Text>
            <Text style={styles.porcentage}><Text style={{fontStyle: "italic"}}>Rate: </Text>{percentageChange.toFixed(2)}%</Text>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      height: 125,
      display: 'flex', 
      justifyContent: 'space-between',
      flexDirection: 'row', 
    },
    company: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5
    },
    price: {
      fontSize: 16,
      paddingBottom: 3
    },
    porcentage: { 
      fontSize: 14,
      paddingTop: 10
    },
    pricesContainer: {
      marginTop: 10,
    },
    priceRow: {
      flexDirection: 'column',
      paddingEnd: 15,
      paddingTop: 25
    },
    infoRow: {
      flexDirection: 'column',
      paddingStart: 15,
      paddingTop: 25
    }
})

