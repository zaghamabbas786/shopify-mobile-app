import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export default function ProductInfo(props) {
  return (
    <View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    colorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    colorButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    selectedColor: {
      borderWidth: 2,
      borderColor: 'black',
    },
    sizeContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-around',
      gap:10
    },
    sizeButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
    },
    selectedSize: {
      borderWidth: 2,
      borderColor: 'lightblue',
    },
    black: {
      color: 'black',
    },
  });