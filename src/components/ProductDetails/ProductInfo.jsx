import React from 'react';
import CustomText from '../CustomText';
import {View} from 'react-native';
import StarRatings from './StarRatings';
import ProductDescription from './ProductDescription';
import Separator from './Separator';
const ProductInfo = ({
  name = 'Dior Homme Cologne',
  price = '$40.00',
  discountedPrice = '$32.00',
}) => {
  return (
    <View style={styles.container}>
      <StarRatings />
      <CustomText style={styles.name}>{name}</CustomText>
      <View style={styles.priceContainer}>
        <CustomText style={styles.discountedPrice}>
          {discountedPrice}
        </CustomText>
        <CustomText style={styles.price}>{price}</CustomText>
      </View>
      <Separator />
      <ProductDescription />
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
  },

  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Montserrat',
    fontSize: 24,
  },

  price: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 22,
    color: '#D89471',
    textDecorationLine: 'line-through',
    paddingLeft: 10,
  },
  discountedPrice: {
    fontFamily: 'Montserrat',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 40,
  },
};

export default ProductInfo;
