import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import TouchAbleButton from './TouchAbleButton';
import apiClient from '../api/apiClient';
import {useSelector} from 'react-redux';
import CustomRenderHtml from './CustomRenderHtml';
import {useWindowDimensions} from 'react-native';
import {PRODUCT_GRID} from '../Schema/querries';

export default function NewArrival({nav}) {
  const {width} = useWindowDimensions();
  const [data, setData] = useState(null);

  const {
    newArrivalRes: {newArrivalData},
  } = useSelector(state => state.adminData.adminData);
  const ArrivalData = newArrivalData && JSON.parse(newArrivalData);

  const getDealOnCollection = async handle => {
    try {
    
      const res = await apiClient.post('', {
        query: PRODUCT_GRID,
        variables: {
          handle
        },
      });
      setData(res?.data?.data?.collectionByHandle);
    } catch (error) {
      console.log('error', error);
    }
  };


  const handlePress = async () => {
    if (!ArrivalData.handle) return;
    nav.navigate('ProductListing', data);
  };

  const viewAllBtn = () => {
    return (
      <View style={styles.btnView}>
        <CustomRenderHtml
          source={{html: ArrivalData.buttonTxt ?? `View All`}}
          contentWidth={width}
        />

        {/* <ArrowRight /> */}
      </View>
    );
  };

  useEffect(() => {
    getDealOnCollection(ArrivalData.handle);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={
            ArrivalData.image
              ? {uri: ArrivalData.image}
              : require('../assets/images/profileIcon.png')
          }
          style={styles.image}
        />
      </View>
      <View
        style={[
          styles.mainView,
          {backgroundColor: ArrivalData.backgroundColor ?? '#fff'},
        ]}>
        <View style={styles.newArrivalMain}>
          <View>
            <CustomRenderHtml
              source={{html: ArrivalData.heading ?? `<h3>New Arrival</h3>`}}
              contentWidth={width}
            />
          </View>
          <View style={{paddingBottom: 10}}>
            <CustomRenderHtml
              source={{
                html: ArrivalData.subHeading ?? `<p>Summer' 25 Collections</p>`,
              }}
              contentWidth={width}
            />
          </View>
        </View>
        <TouchAbleButton
          item={viewAllBtn()}
          style={[
            styles.viewAllBtnContainer,
            {
              backgroundColor: ArrivalData.btnBackgroundColor ?? '#000',
              borderColor: ArrivalData.btnBorderColor ?? '#000',
            },
          ]}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height:270,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingRight: 10,
    paddingLeft: 10,
  },
  newArrivalMain:{
    flexDirection: 'column', 
    justifyContent: 'space-around'
},
  image: {
    width: '100%',
    height: 204,
    // borderRadius: 6
  },
  maintext: {
    // height: 30,
    // top: 8,
    left: 15,
    // fontFamily: 'Montserrat-Bold',
    // fontSize: 22,
    // fontWeight: '500',
    // lineHeight: 20,
    // letterSpacing: 0,
    // textAlign: 'left',
    // color: '#000000',
  },
  textHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    fontWeight: '400',
    // letterSpacing: 0,
    // textAlign: 'left',
    color: '#000000',
  },
  textSubHeading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },
  viewAllBtnContainer: {
    // borderWidth:1,
    // borderColor:'black',
    // // width: 120,
    // padding: 10,
    marginRight: 0,
    // // height: 35,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    // backgroundColor: '#000000'
    // paddingLeft: 13,
    // paddingRight: 13,
    padding: 8,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    // lineHeight: 16,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    // gap: 10,
    alignItems: 'center',
  },
});
