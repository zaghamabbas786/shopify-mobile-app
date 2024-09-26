import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import CrossIcon from '../assets/images/close.svg';
import TouchAbleButton from './TouchAbleButton';

import apiClient from '../api/apiClient';
import {addItemTocart} from '../redux/slices/CartSlice';
import SingleCartProductDesign from './SingleCartProductDesign';
import {useNavigation} from '@react-navigation/native';
import {miniCartStatusFunc} from '../redux/slices/MiniCartStatusSlice';
import {setCount} from '../redux/slices/CartCountSlice';
import {setCartId} from '../redux/slices/CartIdHandle';

export default function Cart(prop) {
  const [cartDetails, setCartDetails] = useState([]);
  const [total, setTotal] = useState(null);
  const [currency, setCuurency] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState();
  const getCart = useSelector(state => state.cart.cart);
  const newCartId = useSelector(state => state.cartId);
  const miniCartStatus = useSelector(state => state.miniCart.miniCartStatus);
  const navigation = useNavigation();
  const [totalQuantity, setTotalQuantity] = useState(0);

  const checkoutbtnTxt = (
    <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
  );

  const dispatch = useDispatch();

  const crossBtn = () => <CrossIcon width={13} height={13} />;
  const cartFetch = async () => {
    try {
      let cart = JSON.parse(await AsyncStorage.getItem('CartItem'));

      if (cart) {
        const {id} = cart;

        const graphqlQuery = `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
            estimatedCost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  estimatedCost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    compareAtAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      image {
                        src
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
            totalQuantity
          }
        }
      `;

        const variables = {cartId: id};

        const response = await apiClient.post('', {
          query: graphqlQuery,
          variables,
        });

        if (response.data.errors) {
          console.error('GraphQL query error:', response.data.errors);
        } else {
          setTotalQuantity(response?.data?.data?.cart.totalQuantity);
          setCartDetails(response.data.data.cart.lines.edges);
          setTotal(response.data.data.cart.estimatedCost.totalAmount.amount);
          setCuurency(
            response.data.data.cart.estimatedCost.totalAmount.currencyCode,
          );
          setCheckoutUrl(response.data.data.cart.checkoutUrl);
          dispatch(addItemTocart(false));
          dispatch(setCount(response.data.data.cart.lines.edges.length));
        }
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      await AsyncStorage.removeItem('CartItem');
      dispatch(setCartId(true));
    }
  };

  const checkBtn = () => {
    navigation.navigate('Checkout', {checkoutUrl});
  };
  useEffect(() => {
    cartFetch();
  }, [getCart, newCartId]);

  useEffect(() => {
    if (miniCartStatus) {
      prop.navigation?.openDrawer();
      dispatch(miniCartStatusFunc(false));
    }
  }, [miniCartStatus]);

  return (
    <View style={{position: 'relative', flex: 1}}>
      <ScrollView style={{paddingBottom: 10}}>
        <View style={[styles.containerPadding]}>
          <View style={styles.cartHeader}>
            <Text style={styles.headerTxt}> Your Cart</Text>
            <TouchAbleButton
              item={crossBtn()}
              style={styles.close}
              onPress={() => prop.navigation.closeDrawer()}
            />
          </View>

          <View style={styles.cartMainContainer}>
            {cartDetails.map(item => {
              return <SingleCartProductDesign item={item} key={item.node.id} />;
            })}
          </View>

          {/* <View>
          <Text style={styles.noteLable}>Order Notes (Additional)</Text>
          <TextInput inputStyle={styles.note} />
        </View> */}
        </View>
        {/* <View style={[styles.subTotalAndShipping, styles.containerPadding]}>
        <View style={styles.subTotalContainer}>
          <Text style={styles.subTotalLable}>Subtotal:</Text>
          <Text style={styles.subTotalVal}>PKR: 275,000</Text>
        </View>
        <View style={styles.shippingCostContainer}>
          <Text style={styles.shippingLable}>Shipping Cost:</Text>
          <Text style={styles.shippingVal}>Calculated at checkout</Text>
        </View>
      </View> */}
      </ScrollView>
      <View style={[styles.checkoutContainer, styles.containerPadding]}>
        <View style={styles.totalOrderMain}></View>
        <View style={styles.subTotalContainer}>
          <Text style={styles.subTotalLable}>
            Total items ({totalQuantity}) :
          </Text>
          <Text style={styles.subTotalVal}>
            {currency} {total}
          </Text>
        </View>
        <TouchAbleButton
          item={checkoutbtnTxt}
          style={[styles.checkout, cartDetails.length === 0 && styles.disabled]}
          onPress={checkBtn}
          disabled={cartDetails.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPadding: {paddingHorizontal: 10},
  container: {
    flexDirection: 'row',
  },
  totalOrderMain: {
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: 30,
    height: 30,

    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cartHeader: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
    borderBottomColor: '#BBB5B5',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  close: {
    position: 'absolute',
    right: 10,
    padding: 15,
  },
  headerTxt: {
    color: 'black',
    textAlign: 'center',
    // marginTop: 14,
    borderColor: 'grey',
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 17,
  },

  productImage: {
    width: 128,
    height: 122,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    position: 'relative',
  },
  gender: {
    color: '#777777',
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  productName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
    paddingVertical: 10,
  },
  productDesc: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    lineHeight: 12,
    color: '#777777',
    paddingBottom: 8,
    width: 173,
  },
  typeContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  type: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 12,
    color: '#000000',
  },
  typeName: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 12,
    color: '#777777',
  },
  sizeContainer: {
    flexDirection: 'row',
  },
  size: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 12,
    color: '#000000',
    paddingBottom: 10,
  },
  sizeVal: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 12,
    color: '#777777',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  originialPrice: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#000000',
    lineHeight: 14,
  },
  comparelPrice: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 14,
    textDecorationLine: 'line-through',
    color: '#D89471',
    // paddingTop: 5,
  },
  quantityContainer: {
    borderWidth: 1,
    width: 165,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    borderColor: '#BBB5B5',
    height: 48,
    alignItems: 'center',
  },
  incrementAndDecrement: {fontSize: 18, color: 'black'},
  val: {
    fontSize: 14,
  },
  quantityAndDelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  banner: {
    position: 'absolute',
    backgroundColor: '#FF8989',
    fontFamily: 'Montserrat',
    fontSize: 8,
    paddingHorizontal: 4,
    top: 13,
    left: 8,
  },
  note: {
    height: 55,
    borderColor: '#BBB5B5',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  noteLable: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 14,
    marginTop: 30,
    color: '#777777',
  },
  subTotalAndShipping: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#BBB5B5',
    paddingVertical: 25,
    marginTop: 30,
    gap: 10,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subTotalLable: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 14,
    color: '#000000',
  },
  subTotalVal: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 14,
    color: 'black',
  },
  shippingCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shippingLable: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 14,
    color: '#777777',
  },
  shippingVal: {
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
  },
  checkoutContainer: {
    // marginTop: 20,
    // gap: 15,
    position: 'absolute',
    bottom: 0,
    // flexDirection: 'row'
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 50,
    // paddingTop: 10
  },
  checkout: {
    backgroundColor: 'black',
    height: 54,
    justifyContent: 'center',
    marginVertical: 10,
  },
  checkoutTxt: {
    fontFamily: 'Montserrat',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 21,
  },
  cartMainContainer: {
    marginTop: 20,
    gap: 10,
    marginBottom: 200,
  },
  disabled: {
    opacity: 0.5,
  },
});
