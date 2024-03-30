import React, { useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { StyleSheet } from "react-native";
import * as Location from 'expo-location';
import axios from "axios";
import Addcity from "./Addcity";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/public/navbar";
import Forecast from '../components/public/forecast'
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useFonts } from "expo-font";

export default function Weather() {

    const [currentdata, setCurrentData] = React.useState([]);
    const [currentcountry, setCurrentCountry] = React.useState([]);
    const [temperature, setTemperature] = React.useState([]);
    const [namecity, setNameCity] = React.useState();
    const [city, setCity] = React.useState([]);
    const [countriesarray, setCountriesArray] = React.useState([]);
    const [tempcity, setTempCity] = React.useState();
    const [alldata, setAllData] = React.useState();
    const navigation  = useNavigation();

    console.log(temperature)

    const fonts = useFonts({
      'SFprotext2': require('../public/fontthin.ttf')
    });

    const fontsregular = useFonts({
      'SFprotextregular': require('../public/fontregular.ttf')
    });

    const fontsemibold = useFonts({
      'SFprotextsemibold': require('../public/fontsemibold.ttf')
    });

    useEffect(() => {
      const fetchLocation = async() => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
          const { coords } = await Location.getCurrentPositionAsync();
          setCurrentData(coords);
        }
        } catch (error) {
          console.log(error)
        }
      };
  
      fetchLocation();
    }, []);

    useEffect(() => {
      const getCountries = async() => {
        try {
          const apiKey = '360074f40a70eac8f62e00cdd3c39105';
          const api = `https://api.openweathermap.org/data/2.5/weather?q=${namecity}&appid=${apiKey}`
          const city = await axios.get(api)
          const temp = Math.floor(city.data.main.temp - 273,15)
          const name = city.data.name
          setCity(name)
          setTempCity(temp)
        } catch(error) {
          console.log(error)
        }
      }
      getCountries();
    }, [namecity])

    useEffect(() => {

      const fetchGeoposition = async () => {
        try {
          const geoposition = await Location.reverseGeocodeAsync({
            latitude: currentdata.latitude,
            longitude: currentdata.longitude,
          });
          const country = geoposition[0]?.country || 'Unknown';
          const city = geoposition[0]?.region || 'Unknown';
          setCurrentCountry({country, city});
        } catch (error) {
          
        }
      };
        fetchGeoposition();

    }, [currentdata]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
              const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${currentdata.latitude}&longitude=${currentdata.longitude}&current=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`;
              
              const response = await axios.get(apiUrl);
              setAllData(response.data)
              const tempmax = Math.floor(alldata.daily.temperature_2m_max)
              const tempmin = Math.floor(alldata.daily.temperature_2m_min)
              const currenttemp = Math.floor(alldata.current.temperature_2m)
              setTemperature([currenttemp, tempmax, tempmin])
            } catch (error) {
              console.log(error)
            }
          };
          
          if (currentdata) {
            fetchWeather();
          }
    }, [currentdata]);

    function removecountry(index) {
      const array = [...countriesarray]
      array.splice(index, 1)
      setCountriesArray(array)
    };

    const translateY = useSharedValue(0)

    return (
    <ImageBackground source={require('../public/Image (1).png')} style={{flex: 1, resizeMode: 'cover'}}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <StatusBar style="light"/>
    <View style={styles.container}>
    <View style={styles.weather}>
        <View style={styles.currentweather}>
            <Text style={{color: 'white', fontFamily: 'SFprotextregular', fontWeight: '100', fontSize: 34, letterSpacing: 0.37}}>
              {currentcountry.city}
            </Text>
            <Text style={{color: 'white', fontFamily: 'SFprotext2', fontWeight: '100', fontSize: 96}}>
              {temperature[0]}°
            </Text>
            <Text style={{color: 'grey', fontFamily: 'SFprotextsemibold', fontWeight: '600', fontSize: 20}}>
              Mostly Clear
            </Text>
            <Text style={{color: 'white', fontFamily: 'SFprotextsemibold', fontSize: 20, justifyContent: 'space-evenly'}}>
            H:{temperature[1]}°     L:{temperature[2]}°
            </Text>
            
        </View>
        {countriesarray.map((newBlock, index) => {
          return <Addcity key={index} city={newBlock.cityname} temp={newBlock.temperature} removecountry={() => removecountry(index)}/>
        })}
    </View>
        <Forecast translateY={translateY} city={city} longitude={Math.floor(currentdata.longitude)} latitude={Math.floor(currentdata.latitude)}/>
        <Navbar translateY={translateY}/>
    </View>
    </GestureHandlerRootView>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    weather: {
        // borderColor: 'white', borderStyle: 'solid', borderWidth: 1,
        alignSelf: 'flex-start',
        marginTop: 98,
        height: 183,
        width: '100%'
    },
    currentweather: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusbutton: {
        borderWidth: 1,
        borderColor: 'black',
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 0,
        margin: 10
    },
    exp: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: 'auto',
      alignItems: 'center'
    }
  });