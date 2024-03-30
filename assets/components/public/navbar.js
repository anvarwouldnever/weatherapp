import React, { useEffect } from "react";
import { View, Dimensions, TextInput, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from "react-native";
import { Svg, Path, LinearGradient, Stop, Defs, Circle, G, Mask, Filter } from "react-native-svg"
import { useNavigation } from "@react-navigation/native";
import { Gesture, GestureDetector, TouchableHighlight } from "react-native-gesture-handler";
import Animated, { Extrapolate, Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MIN_TRANSLATE_Y = -SCREEN_HEIGHT / 2.2;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 120

export default function Navbar({ translateY }) {

    const navigation = useNavigation();
    
    
    const descent = useAnimatedStyle(() => {

      const opacity = interpolate(
        translateY.value,
        [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
        [1, 0],
        Extrapolate.CLAMP
      )

      return {
        opacity,
      }
    })
    return (
        <Animated.View style={[styles.exp, descent]}>
        <Animated.View style={[styles.exp, descent]}>
            <Svg
                width="390"
                height="92"
                viewBox="0 -1 390 92"
                fill="none"
                style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'row'}}
            >
                <Path
                d="M1 2.5166C1 2.5166 77.1385 18.2028 128.077 22.0226C154.424 23.9983 169.642 24.861 196.088 24.7581C222.534 24.6553 236.745 23.6782 263.076 21.4976C313.983 17.2818 390.997 0.999998 390.997 0.999998L391.339 88.9993L1.34221 90.5159L1 2.5166Z"
                fillOpacity="0.26"
                fill="#3A3A6A"
                />
                <Path 
                d="M1 2.5166L1.05045 2.27174L0.748804 2.2096L0.750002 2.51757L1.09221 90.5169L1.09318 90.7669L1.34318 90.7659L391.34 89.2493L391.59 89.2484L391.589 88.9984L391.247 0.999025L391.246 0.691871L390.945 0.755404L390.997 0.999998C390.945 0.755404 390.945 0.755464 390.944 0.755586L390.942 0.756139L390.931 0.758355L390.889 0.767188L390.723 0.802172C390.576 0.833085 390.357 0.879032 390.069 0.939149C389.492 1.05938 388.64 1.23629 387.538 1.46296C385.333 1.9163 382.127 2.56866 378.119 3.36469C370.105 4.95675 358.889 7.12341 346.082 9.42179C320.467 14.0189 288.496 19.1416 263.055 21.2485C236.728 23.4288 222.523 24.4053 196.087 24.5081C169.65 24.6109 154.439 23.7487 128.096 21.7733C102.639 19.8643 70.8794 14.9896 45.4792 10.5908C32.7801 8.39165 21.6726 6.31181 13.7399 4.78178C9.77357 4.01676 6.601 3.38921 4.4201 2.95294C3.32966 2.7348 2.48714 2.56448 1.91728 2.4487C1.63235 2.39082 1.41559 2.34656 1.27009 2.31679L1.10566 2.28309L1.06426 2.27459L1.05388 2.27245L1.0513 2.27192C1.05073 2.2718 1.05045 2.27174 1 2.5166Z" 
                stroke="#7582F4" 
                stroke-opacity="0.5" 
                stroke-width="0.5"
                />
            </Svg>
    </Animated.View>
    <Animated.View style={[styles.exp, descent]}>
    <Svg width="266" height="100" viewBox="0 0 266 100" fill="none" style={{}}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
            <Stop stopColor="#262C51"/>
            <Stop offset="1" stopColor="#3E3F74"/>
        </LinearGradient>
      </Defs>
          <Path 
            d="M112 0H154C186 0 195.501 24.1398 205.732 48.6985C216.325 74.1247 227 100 262 100H4C39 100 49.6753 74.1247 60.2677 48.6985C70.4988 24.1398 80 0 112 0Z" 
            fill="url(#grad)"/>
          <Path 
            d="M112 0.25H154C169.923 0.25 180.229 6.24974 187.838 15.3006C195.21 24.0697 200.053 35.7041 204.994 47.575C205.163 47.9813 205.332 48.3879 205.501 48.7947L205.604 49.0418C210.863 61.6652 216.18 74.4274 224.524 84.0479C231.572 92.1732 240.776 98.0545 253.909 99.75H12.0914C25.2235 98.0545 34.4277 92.1732 41.4756 84.0479C49.8205 74.4273 55.137 61.6651 60.3956 49.0417L60.4985 48.7947C60.668 48.3879 60.8372 47.9813 61.0063 47.5751C65.9473 35.7041 70.7899 24.0697 78.1619 15.3006C85.7707 6.24974 96.0771 0.25 112 0.25Z" 
            stroke="#7582F4" 
            stroke-opacity="0.5" 
            stroke-width="0.5"
          />
    </Svg>
    </Animated.View>
    <TouchableHighlight style={{ width: 60, }} onPress={() => navigation.navigate("Addcity")}>
    <View style={[{ alignSelf: 'center' }]}>
      <Svg width="118" height="118" viewBox="0 0 118 118" fill="#FFFF">
        <Path 
          d="M88.0003 59C88.0003 75.0163 75.0166 88 59.0003 88C42.984 88 30.0003 75.0163 30.0003 59C30.0003 42.9837 42.984 30 59.0003 30C75.0166 30 88.0003 42.9837 88.0003 59ZM32.9003 59C32.9003 73.4146 44.5857 85.1 59.0003 85.1C73.4149 85.1 85.1003 73.4146 85.1003 59C85.1003 44.5854 73.4149 32.9 59.0003 32.9C44.5857 32.9 32.9003 44.5854 32.9003 59Z" 
          fill="#FFFF"
        />
        <Path 
          d="M47.2695 59.1289C47.2695 60.2773 48.1992 61.207 49.3477 61.207H56.9355V68.7949C56.9355 69.9297 57.8516 70.873 59 70.873C60.1484 70.873 61.0781 69.9297 61.0781 68.7949V61.207H68.666C69.8008 61.207 70.7305 60.2773 70.7305 59.1289C70.7305 57.9941 69.8008 57.0645 68.666 57.0645H61.0781V49.4766C61.0781 48.3418 60.1484 47.3984 59 47.3984C57.8516 47.3984 56.9355 48.3418 56.9355 49.4766V57.0645H49.3477C48.1992 57.0645 47.2695 57.9941 47.2695 59.1289Z" 
          fill="#48319D"
        />
      </Svg>
    </View>
    </TouchableHighlight>
    </Animated.View>
    )
};

const styles = StyleSheet.create({
    exp: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: 'auto',
      alignItems: 'center',
    },
    button: { 
      position: 'absolute',
      alignItems: 'center',
      bottom: 0,
      borderRadius: 100,
      width: 60,
      alignSelf: 'center',
      borderColor: 'white',
      borderWidth: 2
    }
  });