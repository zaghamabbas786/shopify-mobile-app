import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ScrollViewBase,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import data from '../enviroment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cartStatus} from '../redux/CartReducer';

export default function Pdp(props) {
  const {AppUrl, StoreFrontUrl, StoreFrontAccessToken} = data;
  const soreFrontUrl = `https://${StoreFrontUrl}/api/2023-10/graphql.json`;
  const StoreFrontAcessTocken = StoreFrontAccessToken;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const compareAtPrice =
    props.route.params?.node?.variants?.edges[0].node.compareAtPrice;
  const currency = props.route.params?.node?.variants?.edges[0].node.currencyCode;

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart[0].status);

  const navigation = useNavigation();

  const handleColorPress = color => {
    setSelectedColor(color);
  };

  const handleSizePress = size => {
    setSelectedSize(size);
  };

  const handleElementPress = ele => {
    setSelectedElement(ele);
  };

  const handSetQuantity = qua => {
    setQuantity(qua);
  };

  const addToCart = async () => {
    const storageData = await AsyncStorage.getItem('CartItem');

    const {id} = JSON.parse(storageData);

    const variantId = props.route.params?.node?.variants?.edges[0].node.id;

    let data = JSON.stringify({
      query: `mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
                    cartLinesAdd(cartId: $cartId, lines: $lines) {
                      cart {
                      id
                          lines(first: 20){
                              edges
                              {
                                  node{
                                      quantity
                                     
                                  }
                              }
                          }
                          cost {
                          totalAmount {
                            amount
                            currencyCode
                          }
                          subtotalAmount {
                            amount
                            currencyCode
                          }
                          totalTaxAmount {
                            amount
                            currencyCode
                          }
                          totalDutyAmount {
                            amount
                            currencyCode
                          }
                        }   
                  }
                  
                  
                      userErrors {
                        field
                        message
                      }
                    }
                  }`,
      variables: {cartId: id, lines: {merchandiseId: variantId, quantity: 1}},
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: soreFrontUrl,
      headers: {
        'X-Shopify-Storefront-Access-Token': StoreFrontAcessTocken,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      dispatch(cartStatus(true));

      navigation.openDrawer();
      // let cartstatus = useSelector(state => state);
      // useDispatch(status(!cartstatus))
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <Image
          style={{width: '100%', height: '50%', objectFit: 'fill'}}
          source={{uri: props.route.params.node.images.edges[0].node.src}}
        />
        <View style={{marginHorizontal: 10}}>
          <Text style={{color: 'black', marginTop: 20}}>
            {props.route.params.node.title}
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {currency}{props.route.params.node.variants.edges[0].node.price}
            </Text>

            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                marginLeft: 5,
                textDecorationLine: 'line-through',
                textDecorationColor: 'black',
              }}>
              {currency}{compareAtPrice}
            </Text>
          </View>

          {/**
           *
           *
           * COLOR
           */}
          <Text style={{color: 'grey'}}>Color</Text>

          <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedColor === 'red' && styles.selectedSize,
              ]}
              onPress={() => handleColorPress('red')}>
              <Text style={styles.black}>RED</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedColor === 'green' && styles.selectedSize,
              ]}
              onPress={() => handleColorPress('green')}>
              <Text style={styles.black}>GREEN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedColor === 'blue' && styles.selectedSize,
              ]}
              onPress={() => handleColorPress('blue')}>
              <Text style={styles.black}>BLUE</Text>
            </TouchableOpacity>
          </View>

          {/**
           *
           *
           * SIZE
           */}

          <Text style={{color: 'grey'}}>Size</Text>
          <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedSize === 'small' && styles.selectedSize,
              ]}
              onPress={() => handleSizePress('small')}>
              <Text style={styles.black}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedSize === 'medium' && styles.selectedSize,
              ]}
              onPress={() => handleSizePress('medium')}>
              <Text style={styles.black}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedSize === 'large' && styles.selectedSize,
              ]}
              onPress={() => handleSizePress('large')}>
              <Text style={styles.black}>Large</Text>
            </TouchableOpacity>
          </View>

          {/**
           *
           *
           * ELEMENT
           */}
          <Text style={{color: 'grey'}}>Element</Text>
          <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedElement === 'xl' && styles.selectedSize,
              ]}
              onPress={() => handleElementPress('xl')}>
              <Text style={styles.black}>Xl</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedElement === 'l' && styles.selectedSize,
              ]}
              onPress={() => handleElementPress('l')}>
              <Text style={styles.black}>L</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedElement === 'm' && styles.selectedSize,
              ]}
              onPress={() => handleElementPress('m')}>
              <Text style={styles.black}>M</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedElement === 's' && styles.selectedSize,
              ]}
              onPress={() => handleElementPress('s')}>
              <Text style={styles.black}>S</Text>
            </TouchableOpacity>
          </View>

          {/**
           *
           *
           * QUANTITY
           */}
          <Text style={{color: 'grey'}}>Quantity</Text>

          <View style={styles.sizeContainer}>
            <TextInput
              style={[styles.black, styles.sizeButton]}
              keyboardType="numeric"
              onChangeText={handSetQuantity}
              value={quantity.toString()}
            />
          </View>

          {/**
           *
           *
           * DESCRIPTION
           */}
          <Button title="Add to Cart" onPress={() => addToCart()} />
          {/* <Text style={{color: 'grey'}}> Description </Text>
              <TextInput style={[styles.black]} /> */}
          {/* <View style={styles.sizeContainer}></View> */}
          <View>{/* <FeaturedProducts /> */}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'black',
  },
  sizeContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    gap: 10,
  },
  sizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  quantityWidth: {
    width: 50,
  },
  selectedSize: {
    borderWidth: 2,
    borderColor: 'lightblue',
  },
  black: {
    color: 'black',
  },
});
