import React from 'react';
import {View} from 'react-native';
import CustomText from '../CustomText';
const desc =
  'Dior Homme Cologne 2022 by Dior is a Citrus Aromatic fragrance for men. This is a new fragrance. Dior Homme Cologne 2022 was launched in 2022. The nose behind this fragrance is François Demachy. Top note is Calabrian bergamot; middle note is Grapefruit blossom; base note is White Musk.';
const ProductDescription = props => {
  return (
    <View>
      <CustomText style={[styles.prodDesc, {color: props.descriptionColor ?? '#000000'}]}>{props.description}</CustomText>
    </View>
  );
};

export default ProductDescription;
const styles = {
  prodDesc: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
  },
};
