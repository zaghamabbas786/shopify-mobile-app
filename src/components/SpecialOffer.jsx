import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import TouchAbleButton from './TouchAbleButton';

export default function SpecialOffer() {
  const AvaiOfferButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.btnTxt}>Avail This Offer</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Text style={styles.special}>SPECIAL</Text>
        <Text style={styles.title}>BLACK FRIDAY SALE UP TO 40% OFF</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeChild}>
            <View>
              <Text style={styles.time}>00</Text>
              <Text style={styles.day}>Days</Text>
            </View>
            <Text style={styles.time}> : </Text>
          </View>
          <View style={styles.timeChild}>
            <View>
              <Text style={styles.time}>00</Text>
              <Text style={styles.day}>Hours</Text>
            </View>
            <Text style={styles.time}> : </Text>
          </View>
          <View style={styles.timeChild}>
            <View>
              <Text style={styles.time}>00</Text>
              <Text style={styles.day}>Mins</Text>
            </View>
            <Text style={styles.time}> : </Text>
          </View>
          <View style={styles.timeChild}>
            <View>
              <Text style={styles.time}>00</Text>
              <Text style={styles.day}>Secs</Text>
            </View>
          </View>
        </View>
        <TouchAbleButton item={AvaiOfferButton()} />
      </View>
      <Image
        source={require('../assets/images/AvailNow.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  special: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 14,
    marginVertical: 20,
    padding: 2,
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 15,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  time: {
    color: 'white',
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Montserrat',
  },
  day: {
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Montserrat',
    paddingVertical: 8,
    alignSelf: 'center',
  },
  timeChild: {
    //   justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#D89471',
    width: 271,
    height: 54,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  btnTxt: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
  image: {
      width: '100%',
      marginVertical:20
  },
  childContainer: {
    paddingHorizontal: 10,
  },
});
