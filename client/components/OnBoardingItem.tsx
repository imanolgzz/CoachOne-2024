import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');


export default function OnBoardingItem({item}) {
  return (
    <View style={{width: 325}}>
        <View style={styles.container}>
            <Text>{item.title}</Text>
            {/* WE CAN ADD MORE THINGS */}
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
    }
})

