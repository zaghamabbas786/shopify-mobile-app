import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function TouchAbleButton({onPress, item, style , disabled = false}) {
  return (
    <View style={style}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        {item}
      </TouchableOpacity>
    </View>
  );
}
