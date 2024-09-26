import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {status} from '../redux/CartReducer';
import Client from 'shopify-buy/index.unoptimized.umd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cart from './Cart';

import data from '../enviroment';

const Products = prop => {
  const {AppUrl, StoreFrontUrl, StoreFrontAccessToken} = data;

  const soreFrontUrl = `https://${StoreFrontUrl}/api/2023-10/graphql.json`;
  const StoreFrontAcessTocken = StoreFrontAccessToken;
  const [status, setStatus] = useState(false);

  const client = Client.buildClient({
    domain: 'giftapp-dev-qa.myshopify.com',
    storefrontAccessToken: StoreFrontAcessTocken,
  });

  const [products, setProducts] = useState(prop?.route?.params.products);

  // const dispatch = useDispatch()

  // console.log("prop?.route?.params.products",prop?.route?.params.products);
  // const cart = useSelector((state) => state.cart.cart)

  const handeleAddTocart = async product => {
    const data = {
      id: product.id,
      title: product.title,
      price: product.variants.edges[0].node.price,
    };

    // dispatch(addToCart(data))

    console.warn('data added to cart');
  };

  const getQuintity = id => {
    const productsQuintity = cart.find(item => {
      return item.id == id;
    });

    if (productsQuintity) {
      return productsQuintity.quintity;
    } else {
      return 1;
    }
  };

  const decrement = async product => {
    const data = {
      id: product,
    };
    dispatch(removeFromCart(data));

    // console.log("asdsad", data);

    getQuintity();
  };

  const addToCart = async product => {
    const storagedata = await AsyncStorage.getItem('CartItem');

    const cartid = JSON.parse(storagedata);

    const variantId = product.variants[0].id;

    let data = JSON.stringify({
      query: `mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
                    cartLinesAdd(cartId: $cartId, lines: $lines) {
                      cart {
                      id
                          lines(first: 10){
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
      variables: {
        cartId: cartid?.id,
        lines: {merchandiseId: variantId, quantity: 1},
      },
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

      // useDispatch(status(!cartstatus))
    } catch (error) {}
  };

  const handleClick = async item => {
    prop.navigation.navigate('Pdp', item);
  };
  const openCart = () => {
    prop.navigation.openDrawer();
  };
  const percentageFormula = item => {
    const val = parseInt(
      ((item?.node.variants?.edges[0].node.compareAtPrice -
        item?.node.variants?.edges[0].node.price) /
        item?.node.variants?.edges[0].node.price) *
        100,
    );
    if (val) {
      return ` - ${val}%`;
    }
    return 0;
  };
  const cartCreate = async () => {
    let cart = await AsyncStorage.getItem('CartItem');

    //    console.log("carttttttttttttttt", cart);

    if (cart) {
      return;
    }

    let data = JSON.stringify({
      query: `mutation  ss{
               cartCreate{
                   cart{
                       checkoutUrl
                       id
                   }
               }
           }`,
      variables: {},
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

    axios
      .request(config)
      .then(response => {
        const {checkoutUrl, id} = response?.data?.data?.cartCreate?.cart;

        AsyncStorage.setItem('CartItem', JSON.stringify({checkoutUrl, id}));

        // console.log(
        //   'seucesssssssssssssssssssssssssssssssssss',
        //   JSON.stringify(response?.data?.data?.cartCreate?.cart),
        // );
      })
      .catch(error => {
        console.log('errorrrrrrrrr', error);
      });
  };

  useEffect(() => {
    cartCreate();
  }, []);

  return (
    <View style={{marginTop: 10}}>
      {/* {console.log(typeof products[0]?.images[0].src, 'Moaiaaaa')} */}
      {/* <Image source={require('../components/mmm.jpeg')} /> */}

      <View style={{height: 50}}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => openCart()}><Text>sdas</Text></TouchableOpacity>
      </View>
      <FlatList
        data={products}
        removeClippedSubviews={true}
        renderItem={({item}) => {
          // console.log(item?.node?.images?.edges[0].node.src, 'MOaiz');
          let productImage = item?.node?.images?.edges[0].node.src;
          // console.log(productImage, 'productImage');
          return (
            <View key={item} style={styles.container}>
              {/* <View key={item} style={{ fontSize: 16, margin: 2, borderWidth: 2, padding: 5, borderRadius: 10 }}   > */}
              <TouchableOpacity onPress={() => handleClick(item)}>
                <Image style={styles.image} source={{uri: productImage}} />
                <View style={styles.bannerContainer}>
                  <Text style={styles.bannerText}>
                    {percentageFormula(item)}
                  </Text>
                </View>
                <Text style={styles.nameText}>{item?.node.title} </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    ${item?.node.variants?.edges[0].node.price}
                  </Text>
                  {/* <Text style={styles.discountedPrice}>{price}</Text> */}
                </View>
              </TouchableOpacity>
              {/* <Pressable onPress={() => handeleAddTocart(item?.node)}>
                                    <Text style={{ color: "black" }} >Product Name : {item?.title} </Text>
                                    <Text style={{ color: "black" }} >Product price : {item?.variants[0]?.price?.amount} </Text> */}
              {/* <Text style= {{color:"black"}} >price : {item?.node?.variants.edges[0].node. >
               */}

              {/* </Pressable> */}

              {/* </View> */}
              {/* <Button title="decrement" onPress={() => decrement(item)}></Button>
                            <Button title="Add to Cart" onPress={() => addToCart(item)}></Button> */}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
  },
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'red', // Replace with your desired banner color
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    // Your price text styles
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartIcon: {
    width: 50,
    height: 50,
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Products;
