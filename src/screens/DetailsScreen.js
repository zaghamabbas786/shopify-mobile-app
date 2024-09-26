import React from 'react';
import {View} from 'react-native';
import CustomText from '../components/CustomText';

const DetailsScreen = ({route}) => {
  const {item} = route.params;
  return (
    <View>
      <CustomText>{item.title}</CustomText>
    </View>
  );
};

export default DetailsScreen;
