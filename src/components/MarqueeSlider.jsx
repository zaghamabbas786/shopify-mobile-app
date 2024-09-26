import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {StrokeText} from '@charmy.tech/react-native-stroke-text';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  withRepeat,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const MarqueeSlider = () => {
  let translationX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      // You can add additional logic here if needed
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });
  const hasAnimationReachedEnd = useDerivedValue(() => {
    return translationX.value <= -width;
  });

  translationX.value = withRepeat(
    withTiming(-width, {duration: 3000, easing: Easing.linear}),
    -1,
    true,
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={gestureHandler}>
        <Animated.View style={[styles.slideContainer, animatedStyle]}>
          <StrokeText
            text="Discover the Atelier of Dreams & find your magical gifts."
            fontSize={50}
            color="white"
            strokeColor="black"
            strokeWidth={2}
            fontFamily="Montserrat-Medium"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    width: width,
  },
});

export default MarqueeSlider;
