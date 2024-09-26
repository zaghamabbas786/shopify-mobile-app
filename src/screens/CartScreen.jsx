import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../assets/images/backarrow.svg';
import Location from '../assets/images/loaction.svg';
import TouchAbleButton from '../components/TouchAbleButton';
import Edit from '../assets/images/edit.svg';
import Add from '../assets/images/add.svg';
import SingleCartProductDesign from '../components/SingleCartProductDesign';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addItemTocart} from '../redux/slices/CartSlice';
import {useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import apiClient from '../api/apiClient';

import {useNavigation} from '@react-navigation/native';
const backBtn = () => {
  return (
    <View>
      <Back width={9} height={19} />
    </View>
  );
};

const placeOrder = () => {
  return (
    <View style={styles.placeOrderContainer}>
      <Text style={styles.placeOrderTxt}>PLACE ORDER</Text>
    </View>
  );
};
const addBtn = () => <Add width={24} height={24} />;
const editBtn = () => <Edit width={12} height={12} />;
const CartScreen = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [total, setTotal] = useState(null);
  const [currency, setCuurency] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getCart = useSelector(state => state.cart.cart);
  const newCartId = useSelector(state => state.cartId);
  const navigation = useNavigation();
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
          setCartDetails(response.data.data.cart.lines.edges);
          setTotal(response.data.data.cart.estimatedCost.totalAmount.amount);
          setCuurency(response.data.data.cart.estimatedCost.totalAmount.currencyCode)
          setCheckoutUrl(response.data.data.cart.checkoutUrl);
          dispatch(addItemTocart(false));
        }
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const orderPlace = () => {
    navigation.navigate('OrderSummery', {checkoutUrl, total, cartDetails});
  };
  useEffect(() => {
    cartFetch();
  }, [getCart, newCartId]);
  useEffect(() => {
    if (newCartId) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          cartFetch();
        },
      );

      return () => {
        backHandler.remove();
      };
    }
  }, [isFocused]);
  return (
    <View style={{position: 'relative', flex: 1, paddingBottom: 120}}>
    <ScrollView style={styles.container}>
      <View style={styles.child}>
        <View style={styles.cartHeader}>
          <TouchAbleButton
            item={backBtn()}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.cartHeadingTxt}>Cart</Text>
        </View>
        {/* location */}
        <View style={styles.locationContainer}>
          <View style={styles.deliveryContainer}>
            <Location width={12} height={15} />
            <Text style={styles.deliverTxt}>Delivery Address</Text>
          </View>
          <View style={styles.addressContainer}>
            <View style={styles.addressDetails}>
              <TouchAbleButton style={styles.edit} item={editBtn()} />
              <Text style={styles.adressTitle}>Address :</Text>
              <Text style={styles.addresDesc}>
                216 St Paul's Rd, London N1 2LL, UK Contact : +44-784232
              </Text>
            </View>

            <TouchAbleButton style={styles.add} item={addBtn()} />
          </View>
        </View>
        <Text style={styles.shopingTxt}>Shopping List</Text>
        <View style={styles.cartList}>
          <View style={styles.cartListchild}>
            {cartDetails?.map(item => (
              <SingleCartProductDesign item={item} key={item.node.id} />
            ))}
          </View>
          
        </View>
       
      </View>
    </ScrollView>

    <View style={styles.totalOrderMain}>
      <View style={styles.totalOrderSub}></View>
        <View style={styles.totalOrderContainer}>
            <Text style={styles.totalTite}>
              Total Order : ({cartDetails?.length})
            </Text>
            <Text style={styles.totyalAmount}>{currency} {total}</Text>
          </View>
        <TouchAbleButton item={placeOrder()} onPress={orderPlace} style={[cartDetails.length === 0 && styles.disabled]} disabled={cartDetails.length === 0}/>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  child: {
    marginHorizontal: 20,

    paddingBottom: 10,
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cartHeadingTxt: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  locationContainer: {},
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  deliverTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    color: '#000000',
  },
  edit: {
    alignSelf: 'flex-end',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressDetails: {
    width: 241,
    elevation: 11,
    shadowColor: '#00000040',
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
  add: {
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 11,
    shadowColor: '#00000040',
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  adressTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 22,
    paddingVertical: 5,
  },
  addresDesc: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 14,
  },
  shopingTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 22,
    marginTop: 30,
    marginBottom: 10,
  },
  cartList: {
    elevation: 11,
    shadowColor: '#00000040',
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
  cartListchild: {
    // borderBottomWidth: 1,
    borderBottomColor: '#BBBBBB',
    paddingBottom: 60,
    gap: 10,
  },
  totalOrderMain: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    width: '100%', 
    backgroundColor: '#fff',
    paddingHorizontal: 20},
    totalOrderSub:{
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB', 
    width: '100%'
  },
  totalOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  totalTite: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 22,
    color: 'black',
  },
  totyalAmount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 22,
    color: 'black',
  },
  placeOrderContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 28,
    marginBottom: 38,
  },
  placeOrderTxt: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
  },
  disabled: {
    opacity: 0.5
  }
});

export default CartScreen;
