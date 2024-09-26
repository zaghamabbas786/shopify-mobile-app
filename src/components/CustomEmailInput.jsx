import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

export default function CustomEmailInput({
  value,
  onChangeText,
  placeholder,
  type,
}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      keyboardType={type}
      autoCapitalize="none"
      autoCorrect={false}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#FFFFFF"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 70,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: '#fff',
  },
});
