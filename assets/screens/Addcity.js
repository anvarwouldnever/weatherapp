import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, TextInput, ImageBackground } from "react-native";
import { useEffect } from "react";
import axios from "axios";

export default function Addcity(props) {
    
    const [namecity, setNameCity] = React.useState();
    const [city, setCity] = React.useState([]);
    const [tempcity, setTempCity] = React.useState();
    const [defaultcitiesarrayinfo, setDefaultCitiesArrayInfo] = React.useState()

    useEffect(() => {
        const getCountries = async() => {
          try {
            if (namecity.length === 0) {
                setCity('');
                setTempCity('');
                return;
            }
            const apiKey = '360074f40a70eac8f62e00cdd3c39105';
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${namecity}&type=like&appid=${apiKey}`
            const city = await axios.get(api)
            const temp = Math.floor(city.data.main.temp - 273,15)
            const name = city.data.name
            setCity(name)
            setTempCity(temp)
          } catch(error) {
            ''
          }
        }
        getCountries();
      }, [namecity])

      useEffect(() => {
        const getDefaultCities = async() => {
          try {
            const defaultcitiesarray = ['tokyo', 'paris', 'moskva', 'berlin', 'new york']
            const promise = defaultcitiesarray.map(async (index) => {
              const apiKey = '360074f40a70eac8f62e00cdd3c39105';
              const api = `https://api.openweathermap.org/data/2.5/weather?q=${index}&appid=${apiKey}`
              const info = await axios.get(api)
              const temp = Math.floor(info.data.main.temp - 273.15)
              const name = info.data.name
              return [name, temp];
            })
            const promises = await Promise.all(promise)
            setDefaultCitiesArrayInfo(promises)
          } catch(error) {
            console.log(error)
          }
        }
        getDefaultCities()
      }, [])

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
        <TextInput style={{ borderColor: 'black', borderWidth: 1, margin: 10, borderRadius: 22, paddingLeft: 13, height: 30}} onChangeText={(text) => {setNameCity(text)}} />
        {city == 0 && defaultcitiesarrayinfo? defaultcitiesarrayinfo.map(([name, temp], index) => {
          return (
          <View style={styles.currentweather} key={index}>
          <Text style={{color: 'black', alignSelf: 'flex-start'}}>
            City: {name}
          </Text>
          <Text style={{alignSelf: 'flex-start'}}>
            Temperature: {temp}°C
          </Text>
          <TouchableHighlight style={styles.deletebutton} onPress={props.removecountry}>
              <Text>delete</Text>
          </TouchableHighlight>
      </View>
      )
        }) : <View style={styles.currentweather}>
            <Text style={{color: 'black', alignSelf: 'flex-start'}}>
              City: {city}
            </Text>
            <Text style={{alignSelf: 'flex-start'}}>
              Temperature: {tempcity}°C
            </Text>
            <TouchableHighlight style={styles.deletebutton} onPress={props.removecountry}>
                <Text>delete</Text>
            </TouchableHighlight>
        </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    currentweather: {
        borderColor: "black",
        borderWidth: 1,
        width: 340,
        height: 100,
        margin: 10,
        borderRadius: 22,
        padding: 10,
        alignSelf: 'center'
    },
    deletebutton: {
        borderColor: "black",
        borderWidth: 1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginBottom: 'auto'
    }
})