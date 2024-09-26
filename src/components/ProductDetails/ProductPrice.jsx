//
import CustomText from '../CustomText';
// import {View} from 'react-native';
import ProductDescription from './ProductDescription';
import AtcQtySelector from './AtcQtySelector';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import apiClient from '../../api/apiClient';
import { getRecomendation } from '../../helpers/productRecomendation';
import SingleProductDesign from '../SingleProductDesign';
import ProductImagery from './ProductImagery';
import { useSelector } from 'react-redux';

const ProductPrice = ({handle, scrollViewRef, id}) => {

  const pdpData = useSelector(state => state.adminData.adminData);
  const mainPDP = pdpData?.pdpRes?.pdpData
  ? JSON.parse(pdpData?.pdpRes?.pdpData)
  : null;

     const typeColor = mainPDP.typeColor;
     const titleColor = mainPDP.titleColor;
     const descriptionColor = mainPDP.descriptionColor;
     const discountPriceColor = mainPDP.discountPriceColor;
     const actualPriceColor = mainPDP.actualPriceColor;


  const [productData, setProductData] = useState(null);
  const [productPrice, setProductPrice] = useState({
    compareAtPriceV2: null,
    priceV2: null,
    currency: null,
  });
  const [recomendations, setRecomendations] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getAjaxToGetDataAndRecomdation();
    return () => {
      setProductData(null);
    };
  }, [handle]);

  const getAjaxToGetDataAndRecomdation = async () => {
    const res = await Promise.all([ajaxToGetData(), getRecomendation(id)]);
    setRecomendations(res[1].products);
  };

  const ajaxToGetData = async () => {
    const query = `
      query {
        productByHandle(handle: "${handle}") {
          id
          title
          description
          handle
          isGiftCard
          productType
          tags
          options {
            id
            name
            values
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                weight
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await apiClient.post('', { query });
      if (response.data.errors) {
        console.error('GraphQL query error:', response.data.errors);
      } else {
        setProductData(response.data.data.productByHandle);
        setProductPrice({
          compareAtPriceV2:
            response.data.data.productByHandle?.variants?.edges[0].node
              ?.compareAtPriceV2?.amount,
          priceV2:
            response.data.data.productByHandle?.variants?.edges[0].node?.priceV2
              ?.amount,
          currency:
            response.data.data.productByHandle.variants?.edges[0].node?.priceV2
              ?.currencyCode,
        });
      }
    } catch (error) {
      console.error('Error fetching productByHandle:', error);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <SingleProductDesign
        recomendations={item}
        scrollViewRef={scrollViewRef}
        currencyCode={productPrice.currency}
      />
    );
  };
  const renderProduct = () => {
    if (
      !productData 
      // !productPrice.compareAtPriceV2 ||
      // !productPrice.priceV2 ||
      // !recomendations
    ) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={50} color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ProductImagery productImages={productData?.images?.edges} />
        <Text style={[styles.type,{color:typeColor ?? '#777777'}]}>{productData?.productType}</Text>
        <CustomText style={[styles.name,{color: titleColor ?? '#000000'}]}>{productData?.title}</CustomText>
        <View style={styles.starRating}>{/* <StarRatings /> */}</View>
        <View style={styles.priceContainer}>
          <CustomText style={[styles.discountedPrice,{color: discountPriceColor ?? '#000000'}]}>
          {productPrice.currency} {productPrice.priceV2}
          </CustomText>
          <CustomText style={[styles.price, {color: actualPriceColor ?? '#D89471'}]}>
          {productPrice.compareAtPriceV2 &&
              `${productPrice.currency} ${productPrice.compareAtPriceV2}`}
          </CustomText>
        </View>
        {/* <Separator /> */}
        <ProductDescription description={productData?.description} descriptionColor={descriptionColor} />
        <AtcQtySelector
          varianID={productData?.variants?.edges[0].node.id}
          productData={productData}
          setProductPrice={setProductPrice}
        />
        {/* <FeaturedProducts />
        <Text style={styles.alsoLikeText}>You May Also Like</Text>
        <ProductNewArrival scrollViewRef={scrollViewRef} /> */}
        <View>
          {recomendations && (
            <FlatList
              data={recomendations}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    );
  };

  return <View>{renderProduct()}</View>;
};

export default ProductPrice;

const styles = {
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FDFDFD',
    marginBottom: 130,
    flex: 1,
  },
  arrowHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    height: 50,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  cartMain: {
    backgroundColor: '#F2F2F2',
    padding: 8,
    borderRadius: 50,
  },
  starRating: {
    marginBottom: 15,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    fontWeight: '700',
    // marginBottom: 10,
    marginTop: 20,
  },
  type: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.5,
    textAlign: 'left',
    marginTop: 40,
  },

  price: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 22,
    textDecorationLine: 'line-through',
    paddingLeft: 10,
  },
  discountedPrice: {
    fontFamily: 'Montserrat',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 35,
  },
  alsoLikeText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
    marginTop: 20,
    color: '#000000',
    left: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
