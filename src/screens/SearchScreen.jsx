import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { setFocus } from '../redux/slices/SearchFocusSlice';
import SearchField from '../components/SearchField';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setFocus(true));
  }, [dispatch]);

  const navToProduct = handle => {
    navigation.navigate('PDP', { handle });
    setSearchQuery('');
  };

  const navToCollection = collection => {
    if (Object.keys(collection).length == 0) return;


    navigation.navigate('ProductListing', collection);
    setSearchQuery('');
  };

  const titles = new Set();

  const collections = suggestions?.filter(item =>  item?.node?.collections?.edges?.length > 0)?.map(e => e?.node?.collections?.edges).flat().filter(e=> {
    if (!titles.has(e.node.title)) {
      titles.add(e.node.title);
      return true;
    }
    return false;  });
  const products = suggestions.filter(({node}) => node.hasOwnProperty('title'));
 
  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity onPress={() => navToCollection(item?.node)} style={styles.collectionItem}>
      {/* {item?.node?.image && (
        <Image source={{ uri: item.node.image.src }} style={styles.collectionImage} />
      )} */}
      <Text style={styles.collectionTitle}>{item?.node?.title}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = (item, idx) => (
    <View key={idx} style={styles.suggestionItemContainer}>
      {item.node.title && (
        <TouchableOpacity onPress={() => navToProduct(item.node.handle)} style={styles.suggestionItem}>
          {item?.node.images?.edges?.length > 0 && (
            <Image source={{ uri: item.node.images.edges[0].node.src }} style={styles.suggestionImage} />
          )}
          <View style={styles.suggestionTextContainer}>
            <Text style={styles.suggestionTitle}>{item.node.title}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceMain}>
              <Text style={styles.priceCurrency}>{item.node.variants.edges[0].node.priceV2.currencyCode}</Text>
              <Text style={styles.price}>{item.node.variants.edges[0].node.priceV2.amount}</Text>
              </View>
              
              {item.node.variants.edges[0].node.compareAtPriceV2 && (
                <View style={styles.comparePriceMain}>
                  <Text style={styles.strikethroughPriceCurrency}>
                    {item.node.variants.edges[0].node.compareAtPriceV2.currencyCode}
                  </Text>
                  <Text style={styles.strikethroughPrice}>
                    {item.node.variants.edges[0].node.compareAtPriceV2.amount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    
    <View style={styles.container}>
      <SearchField
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSuggestions={newSuggestions => {
          setSuggestions(Array.isArray(newSuggestions) ? newSuggestions : []);
        }}
      />
      <Text style={styles.collectionHeading}>Collections</Text>
      <FlatList
        horizontal
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item, index) => `collection-${index}`}
        style={styles.collectionsContainer}
      />
      
      <ScrollView style={styles.suggestionsContainer}>
      <Text style={styles.productHeading}>Products</Text>

        {products.map((item, idx) => renderProductItem(item, idx))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collectionsContainer: {
    paddingHorizontal: 10,
    // paddingVertical: 10,
    height: 10,
  },
  collectionItem: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    height: 40,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777777'
  },
  collectionHeading: {
    marginLeft: 20, 
    fontSize: 22, 
    color: '#000', 
    fontWeight: '700', 
    marginBottom: 20,
    fontFamily: 'Montserrat'
  },
  collectionImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777777',
    fontFamily: 'Montserrat'
  },
  productHeading:{
    fontSize: 22,
    color: '#000', 
    fontWeight: '700', 
    marginBottom: 20, 
    marginTop: 20,
    fontFamily: 'Montserrat'
  },
  suggestionsContainer: {
    paddingHorizontal: 10,
    position: 'absolute',
    width: '95%',
    marginTop: 210,
    borderTopWidth: 1,
    borderTopColor: "#c4c4c4",
    alignSelf: 'center',
    height: 400
  },
  suggestionItemContainer: {
    marginBottom: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionImage: {
    width: 130,
    height: 125,
    marginRight: 10,
  },
  suggestionTextContainer: {
    // flexDirection: 'column',
  },
  suggestionTitle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat'
  },
  priceContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: 'black',
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Montserrat'
  },
  priceCurrency: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat'
  },
  strikethroughPrice: {
    fontWeight: '600',
    color: '#A7A7A7',
    textDecorationLine: 'line-through',
    marginLeft: 10,
    fontFamily: 'Montserrat'
  },
  strikethroughPriceCurrency: {
    fontWeight: '600',
    color: '#A7A7A7',
    textDecorationLine: 'line-through',
    marginLeft: 10,
    fontFamily: 'Montserrat'

  },
  priceMain: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 39, 
    borderWidth: 1, 
    borderColor: '#cacaca', 
    borderRadius: 4, 
    marginTop: 15, 
    marginBottom: 15, 
    padding: 10, 
    alignSelf: 'flex-start'
  },
  comparePriceMain: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
});

export default SearchScreen;
