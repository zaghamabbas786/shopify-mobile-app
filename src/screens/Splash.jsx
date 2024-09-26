import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hsbToHex} from '../helpers/convertTohex';
import CustomRenderHtml from '../components/CustomRenderHtml';
import { addCollectionData } from '../redux/slices/CollectionMenuDataSlice';
import { useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { GET_HOME_COLLECTIONS } from '../Schema/querries';

export const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const splashData = useSelector(state => state.adminData.adminData.splashRes);

  const collections = useSelector(state => state.adminData.adminData);
  const mainCollection = collections?.collectionRes?.collectionData
    ? JSON.parse(collections?.collectionRes?.collectionData)
    : null;
  const collectionHeading = mainCollection?.heading;
  const collectionTitleColor = mainCollection?.titleColor ?? '#21003D';
  const collectionSectionColor = mainCollection?.backgroundColor ?? '#eeeeee';
  const titles = mainCollection ? mainCollection?.title : null;
  const formattedHandles = titles
    ? titles?.map(handle => `title:'${handle}'`).join(' OR ')
    : '';

const fetchCollectionData = useCallback(async () => {
  try {
    const response = await apiClient.post('', {
      query: GET_HOME_COLLECTIONS,
      variables: {
        handles: formattedHandles,
      },
    });
    const obj = {
      collectionData: response.data.data.collections.edges,
      collectionHeading,
      collectionTitleColor,
      collectionSectionColor,
    };
    dispatch(addCollectionData(obj));
  } catch (error) {
    console.error('Error fetching collections:', error);
  }
}, [
  formattedHandles,
  collectionHeading,
  collectionTitleColor,
  collectionSectionColor,
]);

  useEffect(() => {
    const runInParallel = async () => {
      await Promise.all([
        fetchCollectionData(),
        new Promise(resolve => setTimeout(resolve, 2000)),
      ]);

      navigation.replace('DrawerScreen');
    };

    runInParallel();
  }, []);

  const customStyling = dynamicStyles(true, splashData);

  return (
    <ImageBackground
      source={
        splashData?.image
          ? {uri: splashData?.image}
          : require('../assets/images/splash.png')
      }
      style={customStyling.imageBackground}>
      <View style={[customStyling.headingMain]}>
        <Text style={[customStyling.heading]}>
          <CustomRenderHtml source={{html: splashData?.heading}} />
        </Text>
      </View>
      <View>
        <Text style={[customStyling.subHeading]}>
          <CustomRenderHtml source={{html: splashData?.subHeading}} />
        </Text>
      </View>
    </ImageBackground>
  );
};

const dynamicStyles = (isPortrait, splashData) => {
  const headingColorHex = splashData
    ? hsbToHex(JSON.parse(splashData?.headingColor))
    : '#FFFFFF';
  const subHeadingColorHex = splashData
    ? hsbToHex(JSON.parse(splashData?.subHeadingColor))
    : '#FFFFFF';

  return StyleSheet.create({
    imageBackground: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 0,
    },
    headingMain: {
      width: '80%', 
      alignItems: 'center'
    },
    heading: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 38,
      fontWeight: splashData?.fontWeightHeading
        ? splashData.fontWeightHeading
        : '600',
      lineHeight: 41.45,
      letterSpacing: 0.01,
      textAlign: 'center',
      // color: headingColorHex ?? '#FFFFFF',
      top: 210,
      width: 'auto',
      alignItems: 'center',
    },
    subHeading: {
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: splashData?.fontweightSubHeading
        ? splashData.fontweightSubHeading
        : '400',
      textAlign: 'center',
      letterSpacing: 1,
      // color: subHeadingColorHex ?? '#F2F2F2',
      top: 230,
    },
    button: {
      backgroundColor: '#FFFFFF',
      width: 279,
      height: 55,
      top: 264,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 2,
    },
    btnText: {
      color: '#000000',
      width: 136,
      height: 28,
      fontFamily: 'Montserrat-Bold',
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 28.04,
      textAlign: 'center',
      alignSelf: 'center',
    },
  });
};
