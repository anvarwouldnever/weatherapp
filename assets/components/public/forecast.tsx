import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, _ScrollView } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import WeeklyForecast from '../forecast=weeky';
import axios from 'axios';

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MIN_TRANSLATE_Y = -SCREEN_HEIGHT / 2.4;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 120

const SlideUpPanel = ({ translateY, longitude, latitude }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getHourly = async() => {
      try { 
        const forecast = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
        setData(forecast.data)
      }
        catch(error) {
          console.log(error)
      }
    }
    getHourly();
  }, [])

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = translateY.value
  })
  .onUpdate((event) => {
    translateY.value = event.translationY + context.value
    translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y)
  })
  .onEnd(() => {
    if (translateY.value > -SCREEN_HEIGHT / 1.5) {
        scrollTo(MIN_TRANSLATE_Y)
    } else {
      
      scrollTo(MAX_TRANSLATE_Y)
    }
  })

  useEffect(() => {
    scrollTo(MIN_TRANSLATE_Y)
  }, [])

  const rBottomSheetStyle = useAnimatedStyle(() => {

    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    )

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
      <View style={styles.line}></View>
      <WeeklyForecast forecast={data}/>
    </Animated.View>
    </GestureDetector>
    );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#2E335A',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 48,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 12
  }
});

export default SlideUpPanel;
