import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Menu from '../assets/images/menu-line.svg';
import TouchAbleButton from './TouchAbleButton';
const width = 30;
export default function HamburgerMenu() {
  const hamburgerButton = <Menu width={width} height={width} />;
  return (
    <View>
      <TouchAbleButton item={hamburgerButton} style={styles.container}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: width + 50,
    marginRight: 10,
    alignItems:'center'
  },
});
