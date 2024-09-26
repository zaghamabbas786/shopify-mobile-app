import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import TouchAbleButton from './TouchAbleButton';
import PlusBtn from '../assets/images/button.svg';
const windowHeight = Dimensions.get('window').height;

export default function ViewAllproductLinkDesign({style}) {
  const buttonTxt = <Text style={styles.bttxt}>View All Products</Text>;

  return (
    <View style={styles.container}>
      <View style={style}>
        <Text style={styles.title}>Something New From Our Collection</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et
          magna vulputate, posuere erat sit amet, imperdiet libero. Etiam tempus
          lectus in magna vestibulum, at ornare dolor fermentum.
        </Text>
        <TouchAbleButton item={buttonTxt} style={styles.button} />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../assets/images/productBackround.png')}
          resizeMode="stretch"
          style={styles.image}>
          <View style={styles.btn1}>
            <TouchAbleButton item={<PlusBtn width={80} height={80} />} />
          </View>
          <View style={styles.btn2}>
            <TouchAbleButton item={<PlusBtn width={80} height={80} />} />
          </View>
          <View style={styles.btn3}>
            <TouchAbleButton item={<PlusBtn width={80} height={80} />} />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '400',
    marginVertical: 20,
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D89471',
    paddingVertical: 17,
    width: 268,
  },
  bttxt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat',
  },
  image: {
    width: '100%',
    height: windowHeight / 2.5,
    position: 'relative',
  },
  btn1: {
    position: 'absolute',
    top: 10,
    left: 50,
  },
  btn2: {
    position: 'absolute',
    top: 0,
    right: 50,
  },
  btn3: {
    position: 'absolute',
    top: 100,
    right: 130,
  },
  imageContainer: {
    marginTop: 50,
  },
});
