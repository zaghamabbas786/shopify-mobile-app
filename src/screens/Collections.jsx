import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Header from '../components/Header';
import CustomHeader from '../components/CustomHeader';
import Collections from '../components/Collections';
import ShopByBrand from '../components/ShopByBrand';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';
import SpecialOffer from '../components/SpecialOffer';

const graphqlQuery = `query MyQuery {
  collections(first: 10) {
    edges {
      node {
        image {
          src
        } 
        title
      }
    }
  }
}`;

export default function CollectionPage({navigation}) {
  const [collectionData, setCollectionData] = useState([]);
  const desc =
    'We are inspired by the realities of life today, in whichtraditional divides between personal and professional space are more fluid.';

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await apiClient.post('', {query: graphqlQuery});
        setCollectionData(response.data.data.collections.edges);
        navigation.openDrawer();
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollectionData();
  }, []);

  return (
    <ScrollView>
      <CustomHeader />
      <View style={styles.hero}>
        <View style={styles.titleAndDes}>
          <Text style={styles.title}>Our Collections</Text>
          <Text style={styles.description}>
            At denver.com, our mission is to provide you with the largest
            selection of perfumes and colognes at the lowest prices.
          </Text>
        </View>
        <Image
          source={require('../assets/images/Collection-hero.png')}
          style={styles.image}
        />
      </View>
      <Collections
        collectiondta={collectionData}
        title={'Shop By Type'}
        descrption={desc}
      />
      <ShopByBrand />
      <SpecialOffer />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'black',
  },
  title: {
    fontFamily: 'Montserrat-Light',
    fontSize: 24,
    lineHeight: 90,
    color: 'white',
    letterSpacing: 8,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 19.5,
    color: '#777777',
    marginBottom: 25,
  },
  titleAndDes: {
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
  },
});
