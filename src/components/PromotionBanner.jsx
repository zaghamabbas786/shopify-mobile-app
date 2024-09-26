import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import apiClient from '../api/apiClient';
import VideoPlayer from './VideoPlayer';
import CustomRenderHtml from './CustomRenderHtml';
import {useWindowDimensions} from 'react-native';
import { removeHtmlTags } from '../helpers/htmlPareser';
import { useSelector } from 'react-redux';

const PromotionBanner = ({
  customStyling,
  isPortrait,
  item,
  index,
  navigation,
}) => {
  const {width} = useWindowDimensions();
  const querry = handle => {
    return `query MyQuery {
  collectionByHandle(handle: "${handle}") {
    title
    handle
    products(first: 20) {
        edges {
        cursor
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
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
            handle
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
  }
}`;
  };
  let stop = useRef(false);
  const calculateTimeLeft = () => {
    const {timeEnd} = item;
    const difference = +new Date(timeEnd) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      stop.current = true;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if (stop.current) {
      clearInterval(timer);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);
  const {days, hours, minutes, seconds} = timeLeft;
  const formatTime = value => {
    return value < 10 ? `0${value}` : value;
  };

  const getDealOnCollection = async handle => {
    try {
      const q = querry(handle);
      const res = await apiClient.post('', {query: q});

      return res?.data?.data?.collectionByHandle;
    } catch (error) {
      console.log('error', error);
    }
  };
  const getDealOnProduct = handle => {
    try {
      navigation.navigate('PDP', {handle});
    } catch (error) {
      console.log('error===>', error);
    }
  };

  const handlePress = async () => {
    const {handle} = item;
    if (
      (item.hasOwnProperty('promotionType') && item?.promotionType == 1) ||
      (item.hasOwnProperty('bannerType') && item?.bannerType == 1)
    ) {
      const productData = await getDealOnCollection(handle);
      if (!productData) return;
      navigation.navigate('ProductListing', productData);
    }
    if (
      (item.hasOwnProperty('promotionType') && item?.promotionType == 2) ||
      (item.hasOwnProperty('bannerType') && item?.bannerType == 2)
    ) {
      getDealOnProduct(handle);
    }
  };
  const btnText = removeHtmlTags(item?.buttonTxt);

  const promotionRes = useSelector(state => state.adminData?.adminData.promotionRes);
  const bannerHeadingAlignment = promotionRes?.bannerHeadingAlign ? JSON.parse(promotionRes?.bannerHeadingAlign) : null;
  const bannerButtonAlignment = promotionRes?.bannerButtonAlign ? JSON.parse(promotionRes?.bannerButtonAlign) : null;
  const bannerTimerAlignment = promotionRes?.bannerTimerAlign ? JSON.parse(promotionRes?.bannerTimerAlign) : null;

  return (
    <View style={customStyling.mainContainer}>
      {item.videoLink  ? (
        <View
          style={{
            aspectRatio: 16 / 9,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 209.5,
            marginTop: 10,
            borderRadius: 12,
            overflow: 'hidden',
            resizeMode: 'cover',
            // marginHorizontal: 10
            // padding: 20,
           
          }}>
          <VideoPlayer videoUrl={item.videoLink} />
         </View>
      ) : (
        <ImageBackground
          source={
            item?.image
              ? {uri: item?.image}
              : require('../assets/images/carousel1.png')
          }
          style={customStyling.imageBackground}>

          <View style={customStyling.textOverlay}>
            <View style={{alignSelf: bannerHeadingAlignment ? bannerHeadingAlignment : 'flex-start',marginBottom: 10}}>
            <CustomRenderHtml
              source={{html: item.heading ?? `Flat of on sale`}}
              contentWidth={width}
            />
            </View>

            {btnText ? (
              <TouchableOpacity
              style={[customStyling.button, {alignSelf: bannerButtonAlignment ? bannerButtonAlignment : "flex-start"}]}
              onPress={handlePress}>

              <CustomRenderHtml
                source={{html: item?.buttonTxt }}
                tagsStyles={{
                  img: {
                    display: 'inline-block',
                    marginTop: 4,
                  },
                  p: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    padding: 0,
                    color: 'red'
                  },
                }}
                contentWidth={width}
              />
            </TouchableOpacity>
            ) : (
              <View style= {{height: 30}}></View>
            )}
            

            <View style={{}}>
            {item.hasOwnProperty('showTimer') && item.showTimer &&  item?.timeEnd?.trim() && item?.timeStart?.trim()  && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,alignSelf: bannerTimerAlignment ? bannerTimerAlignment : "flex-start" }}>
            <View>
              <Text style={{color: '#fff', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600'}}>{formatTime(days)} : </Text>
              <Text style={{color: '#fff', fontSize: 12, fontFamily: 'Montserrat', fontWeight: 400}}>Days</Text>
            </View>
            <View>
              <Text style={{color: '#fff', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600'}}>{formatTime(hours)} : </Text>
              <Text style={{color: '#fff', fontSize: 12, fontFamily: 'Montserrat', fontWeight: 400}}>Hours</Text>
            </View>
            <View>
              <Text style={{color: '#fff', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600'}}>{formatTime(minutes)} : </Text>
              <Text style={{color: '#fff', fontSize: 12, fontFamily: 'Montserrat', fontWeight: 400}}>Mins</Text>
            </View>
            <View>
              <Text style={{color: '#fff', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600'}}>{formatTime(seconds)}</Text>
              <Text style={{color: '#fff', fontSize: 12, fontFamily: 'Montserrat', fontWeight: 400}}>Secs</Text>
            </View>
          </View>
        )}
            </View>
          </View>
         
        </ImageBackground>
      )}
    </View>
  );
};

export default memo(PromotionBanner);
