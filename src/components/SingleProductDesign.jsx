import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React from 'react';
import { useScreenDimensions } from '../hooks/useScreenDimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { addItemTocart } from '../redux/slices/CartSlice';
import AddToCartIcon from '../assets/images/quickPlusIcon.svg';
import { hsbToHex } from '../helpers/convertTohex';



function SingleProductDesign({ data, recomendations, scrollViewRef, gridData, home }) {
  const dimensions = useScreenDimensions();
  const productTileRes = useSelector(
    state => state.adminData.adminData.productTileRes,
  );
  const productTileData = productTileRes ?? null;
  const customStyling = styles(dimensions, gridData, productTileData);
  const image = data
    ? data.images?.edges[0].node.src
    : 'https:' + recomendations.featured_image;
  const price = data
    ? data.variants?.edges[0]?.node.compareAtPriceV2?.amount
    : (recomendations.compare_at_price / 100).toFixed(2);
  const discountPrice = data
    ? data.variants?.edges[0].node?.priceV2?.amount
    : (recomendations.price / 100).toFixed(2);
  const currency = data
    ? data.variants?.edges[0].node.priceV2.currencyCode
    : '$';
  const sale = data
    ? data.variants?.edges[0].node.availableForSale
    : discountPrice < price;
  const handle = data ? data.handle : recomendations.handle;
  const id = data ? data?.id : recomendations.id;
  const title = data ? data.title : recomendations.title;
  const description = data
    ? data.description
    : recomendations.description.replace(/<[^>]*>/g, '');

  const productType = data ? data.productType : recomendations.type;

  const variantId = data
    ? data.variants?.edges[0].node.id
    : 'gid://shopify/ProductVariant/' + recomendations?.variants[0].id;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSingleProduct = () => {
    // Navigate to the next screen with article data as route params
    navigation.navigate('PDP', { handle, id });
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({ y: 0, animated: true });
    }, 1000);
  };

  const addToCart = async () => {
    try {
      const storageData = await AsyncStorage.getItem('CartItem');
      const { id } = JSON.parse(storageData);

      const graphqlMutation = `
      mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 20) {
              edges {
                node {
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
      }
    `;

      const response = await apiClient.post('', {
        query: graphqlMutation,
        variables: {
          cartId: id,
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        },
      });

      if (response.data.errors) {
        console.error('GraphQL mutation error:', response.data.errors);
      } else {
        dispatch(addItemTocart(true));
        navigation.getParent('RightDrawer').openDrawer();
      }
    } catch (error) {
      console.log('add to cart error', error);
    }
  };

  return (
    <View style={[customStyling.container, {width: home ? 225 : 175}]}>
      <TouchableOpacity
        style={customStyling.button}
        onPress={handleSingleProduct}>
        {sale ? (
          <View style={customStyling.bannerContainer}>
            <Text style={customStyling.bannerText}>
              {/* {percentageFormula(item)} 77 */} On Sale
            </Text>
          </View>
        ) : null}
        <View style={customStyling.atcIcon}>
          <TouchableOpacity onPress={addToCart}>
            <AddToCartIcon width={50} height={50} />
          </TouchableOpacity>
        </View>
        <Image style={customStyling.image} source={{uri: image}} />
        <Text style={customStyling.gender}>{productType}</Text>
        <Text numberOfLines={1} style={customStyling.title}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={customStyling.description}>
          {description}
          {/* Eau de toilette - fresh, woody and spicy notes */}
        </Text>
        <View style={customStyling.priceContainer}>
          <Text style={customStyling.priceText}>
            {currency + ' '}
            {discountPrice}
          </Text>
          <Text style={customStyling.compare}>
            {price && `${currency} ${price}`}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={customStyling.cartBtn} onPress={addToCart}>
        <Text style={customStyling.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = ({ isPortrait }, gridData, productTileData) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: 5,
      marginRight: 20,
    },
    atcIcon:{
      position: 'absolute', 
      right: 15, 
      zIndex: 1, 
      top: 20
  },
    button: {
      position: 'relative',
      padding: 15,
    },
    image: {
      width: 175,
      height: 208,
    },
    bannerContainer: {
      position: 'absolute',
      top: 32,
      left: 22,
      backgroundColor: '#A7DAA9', // Replace with your desired banner color
      paddingHorizontal: 8,
      paddingVertical: 2,
      zIndex: 1,
    },
    bannerText: {
      color: 'black',
      fontWeight: '400',
      fontSize: 10,
    },
    nameText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    priceText: {
      fontWeight: productTileData?.fontWeightProductPrice
        ? productTileData?.fontWeightProductPrice
        : 'bold',
      color: productTileData?.productPriceColor
        ? hsbToHex(JSON.parse(productTileData?.productPriceColor))
        : 'black',
      fontSize: 18,
      fontFamily: 'Montserrat',
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
    title: {
      fontFamily: 'Montserrat',
      fontWeight: productTileData?.fontWeightProductTitle
        ? productTileData?.fontWeightProductTitle
        : 'bold',
      fontSize: 13,
      color: productTileData?.productTitleColor
        ? hsbToHex(JSON.parse(productTileData?.productTitleColor))
        : '#000000',
      width: 143,
    },
    gender: {
      color: productTileData?.productTypeColor
        ? hsbToHex(JSON.parse(productTileData?.productTypeColor))
        : '#777777',
      fontFamily: 'Montserrat',
      fontSize: 10,
      fontWeight: productTileData?.fontWeightProductType
        ? productTileData?.fontWeightProductType
        : '400',
    },
    description: {
      fontFamily: 'Montserrat',
      fontWeight: productTileData?.fontWeightProductDescription
        ? productTileData?.fontWeightProductDescription
        : '400',
      fontSize: 10,
      marginVertical: 10,
      color: productTileData
        ? hsbToHex(JSON.parse(productTileData?.productDescriptionColor))
        : '#777777',
      width: 143,
    },
    compare: {
      color: productTileData?.productDiscountPriceColor
        ? hsbToHex(JSON.parse(productTileData?.productDiscountPriceColor))
        : '#D89471',
      fontWeight: productTileData?.fontWeightProductDiscountPrice
        ? productTileData?.fontWeightProductDiscountPrice
        : '400',
      fontSize: 12,
      textDecorationLine: 'line-through',
    },
    cartBtn: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 4,
      // marginTop: 25,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      paddingRight: 6,
      alignItems: 'center',
    },
    cartBtnText: {
      fontSize: 14,
      color: '#000',
      fontFamily: 'Montserrat',
      fontWeight: '400',
      textTransform: 'uppercase',
    },
  });
};

export default React.memo(SingleProductDesign);
