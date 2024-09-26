import React from 'react';
import {TextInput as NativeTextInput, StyleSheet} from 'react-native';

const TextInput = ({placeholder, onChangeText, value, inputStyle}) => {
  return (
    <NativeTextInput
      style={inputStyle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default TextInput;
