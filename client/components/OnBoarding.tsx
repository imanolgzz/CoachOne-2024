import React, { useState, useRef } from "react";
import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import OnBoardingItem from "./OnBoardingItem";
import stockData from '@/mock/companyPrices.json';

export function OnBoarding(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const sliderRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return(
        <View elevation={5} style={styles.container}>
            <FlatList 
                data={stockData.data} 
                renderItem={({ item }) => <OnBoardingItem item={item} />} 
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}   
                onScroll={Animated.event([{nativeEvent: {contentOffset: { x: scrollX }}}],
                    {useNativeDriver: false,}
                )}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={sliderRef}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 325,
        height: 125,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    }
});