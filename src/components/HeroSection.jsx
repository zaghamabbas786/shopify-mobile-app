import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import ExplorBtn from '../assets/images/explore button.svg';
import VideoVtn from '../assets/images/video button (1)';

import TouchAbleButton from './TouchAbleButton';
const windowHeight = Dimensions.get('window').height;
export default function HeroSection() {
  return (
    <View style={{flex: 1, height: 'auto'}}>
      <ImageBackground
        source={require('../assets/images/heroImage.png')}
        resizeMode="stretch"
        style={styles.image}>
       
        <Text style={styles.heading}>BORN IN THE WILD, CRAFTED BY DENVER</Text>
        <View style={styles.exploreBtn}>
          <TouchAbleButton item={<ExplorBtn width={187} height={30} />} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: windowHeight - 100,
    position: 'relative',
  },
  exploreBtn: {
    position: 'absolute',
    bottom: 21,
    left: 21,
  },
  heading: {
    color: '#FFFFFF',
    position: 'absolute',
    marginTop: '60%',
    fontSize: 22,
    fontWeight: '200',
    fontFamily: 'Montserrat-Thin',
    paddingHorizontal: 10,
    lineHeight: 35,
    letterSpacing: 5,
  },
  videBtn: {
    position: 'absolute',
    right: 15,
    top: 83,
  },
});
