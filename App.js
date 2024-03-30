import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './assets/screens/Weather';
import Addcity from './assets/screens/Addcity'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Weather">
      <Stack.Screen name="Weather" component={Weather} options={{headerShown: false}}/>
      <Stack.Screen  name="Addcity" component={Addcity}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}


