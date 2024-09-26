import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Increment from '../assets/images/increment.svg';
import Decrement from '../assets/images/decrement.svg';
import DeleteIcon from '../assets/images/deleteIcon.svg';
import TouchAbleButton from './TouchAbleButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addItemTocart} from '../redux/slices/CartSlice';
import apiClient from '../api/apiClient';
const percentage = (comp, org) => {
  if (comp && org)
    ' upto ' + parseFloat(((comp - org) / org) * 100).toFixed(2) + '%';
};

const decrementBtn = <Decrement width={12} height={25} />;
const incrementBtn = <Increment width={12} height={25} />;

const SingleCartProductDesign = ({item, OrderSummeryScreen = false}) => {
  const navigation = useNavigation();
  const deleteIcon = <DeleteIcon width={30} height={30} />;
  const dispatch = useDispatch();

  const image = () => (
    <Image
      source={
        item
          ? {uri: item.node.merchandise.image.src}
          : require('../assets/images/cartProduct.png')
      }
      style={{height: 125, width: 130, borderRadius: 10}}
    />
  );
  function debounce(func, delay) {
    let timeoutId;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  const updateCart = async (lineId, quantity) => {
    try {
      const storagedata = await AsyncStorage.getItem('CartItem');
      const {id} = JSON.parse(storagedata);

      const graphqlMutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

      const variables = {
        cartId: id,
        lines: [{id: lineId, quantity: quantity}],
      };

      const response = await apiClient.post('', {
        query: graphqlMutation,
        variables,
      });

      if (response.data.errors) {
        console.error('GraphQL mutation error:', response.data.errors);
      } else {
        dispatch(addItemTocart(true));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleCartUpdate = async (id, quantity) => {
    const func = await updateCart(id, quantity);

    debounce(func, 1000);
  };

  const sizeValue = () => {
    const sizeOption = item?.node.merchandise.selectedOptions.find(
      opt => opt.name === 'Size',
    );
    if (sizeOption) {
      return sizeOption.value;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {image()}
      <View style={styles.cartDetailContainer}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.productTitle}>
          {item ? item.node.merchandise.product.title : 'Dior Homme Cologne'}{' '}
        </Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Size: </Text>
          <Text style={styles.sizeVal}>{sizeValue()}</Text>
        </View>
        {!OrderSummeryScreen && (
          <View style={styles.quantityAndDelContainer}>
            <View style={styles.quantityContainer}>
              <TouchAbleButton
                item={decrementBtn}
                style={styles.incrementAndDecrement}
                onPress={() =>
                  handleCartUpdate(item?.node?.id, item?.node?.quantity - 1)
                }
              />
              <Text style={styles.val}>{item?.node?.quantity ?? '1'}</Text>
              <TouchAbleButton
                item={incrementBtn}
                style={styles.incrementAndDecrement}
                onPress={() =>
                  handleCartUpdate(item?.node?.id, item?.node?.quantity + 1)
                }
              />
            </View>
            {/* <TouchAbleButton
              item={deleteIcon}
              onPress={() => handleCartUpdate(item?.node?.id, 0)}
            /> */}
          </View>
        )}
        <View style={styles.priceContainer}>
          <View style={styles.price}>
            <Text style={styles.priceTxt}>
              {item
                ? item.node.estimatedCost.subtotalAmount?.currencyCode +
                  ' ' +
                  item.node.estimatedCost.subtotalAmount.amount
                : '32.00'}
            </Text>
          </View>
          <View style={styles.comparePriceCOntainer}>
            <Text style={styles.percentage}>
              {item &&
                percentage(
                  item?.node?.estimatedCost?.compareAtAmount?.amount *
                    item.node.quantity,
                  item?.node?.estimatedCost?.subtotalAmount?.amount,
                )}
            </Text>
            <Text style={styles.comparePrice}>
              {item &&
                item.node.estimatedCost.compareAtAmount?.amount &&
                item.node.estimatedCost.subtotalAmount?.currencyCode +
                  ' ' +
                  (
                    item.node.estimatedCost.compareAtAmount?.amount *
                    item?.node?.quantity
                  ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    width: 312,
  },

  productTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 22,
    color: 'black',
    width: 157,
  },
  cartDetailContainer: {
    paddingVertical: 10,
  },
  priceContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  price: {
    // width: 84,
    height: 29,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CACACA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:4
  },
  priceTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    color: 'black',
  },
  comparePriceCOntainer: {},
  percentage: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 22,
    color: '#EB3030',
  },
  comparePrice: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: '#A7A7A7',
    textDecorationLine: 'line-through',
  },
  quantityAndDelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  quantityContainer: {
    borderWidth: 1,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderColor: '#CACACA',
    height: 29,
    alignItems: 'center',
    borderRadius: 4,
  },
  incrementAndDecrement: {fontSize: 18, color: 'black'},
  val: {
    fontSize: 14,
    color: '#777777',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeTitle: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 22,
  },
  sizeVal: {
    color: '#777777',
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 22,
  },
});

export default React.memo(SingleCartProductDesign);
