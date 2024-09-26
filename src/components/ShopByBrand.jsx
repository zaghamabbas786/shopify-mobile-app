import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import TouchAbleButton from './TouchAbleButton';
import { useSelector } from 'react-redux';
import CustomRenderHtml from './CustomRenderHtml';

export default function ShopByBrand() {
  const {
    shopByBrandRes: {shopByBrandData},
  } = useSelector(state => state.adminData.adminData);
  const brandData = shopByBrandData && JSON.parse(shopByBrandData);
  const brandImagesData = brandData?.images;

  if (brandImagesData == '') {
    return <View />;
  }else{
    return (
        <View style={[styles.container, { backgroundColor: brandData.backgroundColor }]}>
          <Text style={styles.title}>
            <CustomRenderHtml source={{ html: brandData.heading ?? "Shop by Brands" }} />
          </Text>
      
          <Text style={styles.description}>
            <CustomRenderHtml source={{ html: brandData.subHeading ?? "Add a subheading to provide more details about this collection." }} />
          </Text>
      
          <View style={styles.brandContainer}>
            {brandData?.images?.filter(e => e.length > 0).map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={styles.brand}
              />
            ))}
          </View>
        </View>
      
      
      
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    padding: 20,
    marginTop: 0,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat',
    marginVertical: 10,
    fontWeight: '400',
  },
  description: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 12,
    fontFamily: 'Montserrat',
    marginBottom: 20,
    fontWeight: '400',
  },
  brandContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    height: 100,
    width: 150,
  },
});
