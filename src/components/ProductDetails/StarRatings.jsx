import {View} from 'react-native';
import StarImage from '../../assets/images/star.svg';
import React from 'react';
import CustomText from '../CustomText';
export default function StarRatings() {
  return (
    <View style={{flexDirection: 'row', }}>
      {[...Array(5)].map((_, i) => (
        <StarImage key={i} width={30} height={25} style={{marginRight: 5}} />
      ))}
      <CustomText style={styles.reviewsCount}>{'16 reviews'}</CustomText>
    </View>
  );
}
const styles = {
  reviewsCount: {
    fontFamily: 'Montserrat',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#777777',
    marginLeft: 8
  },
};
