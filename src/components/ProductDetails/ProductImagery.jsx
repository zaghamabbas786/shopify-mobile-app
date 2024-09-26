import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default function ProductImagery(props) {
  const [images, setImages] = useState([]);
  const pdpImages = props.productImages.map((edge, index) => ({
    id: index,
    url: edge.node.originalSrc,
  }));

  useFocusEffect(
    useCallback(() => {
      setImages(pdpImages);
      return () => {
        setImages([]);
      };
    }, [])
  );

  if (images.length == 0) return;
  return (
    <Swiper
      style={{height: 300}}
      activeDotColor="gray"
      paginationStyle={styles.pagination}
      removeClippedSubviews={false}>
      {images.map((image, index) => (
        <View key={index} style={{flex: 1}}>
          <Image
            source={{uri: image.url}}
            style={styles.sliderImg}
          />
        </View>
      ))}
    </Swiper>
  );
}

const styles = {
  pagination: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sliderImg:{
    flex: 1,
    borderRadius: 16
  }
};
