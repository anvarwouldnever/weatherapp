import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useFonts } from "expo-font";

const WeeklyForecast = ({ forecast }) => {

    const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8])
    const [data, setData] = useState([])

    useEffect(() => {
      if(forecast) {
        setData(forecast.hourly)
      } else {
        return;
      }
    }, [forecast])

    return (
        <View style={styles.container}>
          <View style={styles.weekly} />
          <View />
          <ScrollView style={styles.forecast} horizontal={true}>
            {array.map((index) => {
              
              return (
                <View style={styles.ellipse} key={index}>
                    <Text></Text>
                    <Text></Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    weekly: {
        borderColor: 'white', borderStyle: 'solid', borderWidth: 1,
        position: 'relative',
        height: 16,
        marginVertical: 5,
    },
    forecast: {
        // borderColor: 'white', borderStyle: 'solid', borderWidth: 1,
        height: 150,
        margin: 20,
        flexDirection: 'row',
        width: 'auto',
    },
    ellipse: {
        borderColor: '#48319D', borderStyle: 'solid', borderWidth: 1,
        height: 150,
        width: 60,
        borderRadius: 100,
        backgroundColor: '#271A54',
        marginHorizontal: 5
      }
})

export default WeeklyForecast;