import {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TouchAbleButton from './TouchAbleButton';
import {useScreenDimensions} from '../hooks/useScreenDimensions';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PromotionBanner from './PromotionBanner';

const HomeCarousel = () => {
  const dimensions = useScreenDimensions();
  const {width} = dimensions;
  const customStyling = styles(dimensions);
  const navigation = useNavigation();
  const promotionRes = useSelector(
    state => state.adminData?.adminData.promotionRes,
  );
  const promotionData =
    promotionRes?.promotionData && JSON.parse(promotionRes?.promotionData);
  const data = [...promotionData];
  const currentTime = new Date();
  const filterData = data.filter(e => {
    if (e.hasOwnProperty('showTimer') && e.showTimer) {
      const start = new Date(e.timeStart);
      const end = new Date(e.timeEnd);
      if (currentTime < start || currentTime > end) {
        return false;
      }
    }
    return true;
  });

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIscrolling] = useState(false);

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;

    // const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    // const currentPosition =
    //   contentOffset.x / (contentSize.width - layoutMeasurement.width);
    // const calculatedIndex = Math.floor(currentPosition * data.length);
    // const lastIndex = data.length - 1;
    // setCurrentIndex(calculatedIndex < lastIndex ? calculatedIndex : lastIndex);
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };
  const timeoutRef = useRef(null);
  const handleEndScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIscrolling(false);
    }, 300);
  }, []);
  const handleStartScroll = useCallback(() => {
    setIscrolling(true);
  }, []);
  const handleDotPress = useCallback(index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: false});
    }
  }, []);

  const renderDot = useCallback(
    index => {
      return (
        <TouchAbleButton
          key={index}
          item={
            <View
              style={[
                customStyling.dot,
                {backgroundColor: index === currentIndex ? 'black' : '#D9D9D9'},
              ]}
            />
          }
          onPress={() => handleDotPress(index)}
        />
      );
    },
    [currentIndex, handleDotPress],
  );

  const dots = useMemo(() => {
    return filterData?.map((_, index) => renderDot(index));
  }, [renderDot]);
  const renderItem =
    ({isPortrait}) =>
    ({item, index}) => {
      return (
        <PromotionBanner
          item={item}
          index={index}
          navigation={navigation}
          isPortrait={isPortrait}
          customStyling={customStyling}
        />
      );
    };
  const ItemSeparatorComponent = useCallback(
    () => <View style={{width: isScrolling ? 10 : 0}} />,
    [isScrolling],
  );
  const keyExtractor = useCallback((item, index) => index, []);
  return (
    <View>
      <View style={customStyling.products}>
        <FlatList
          ref={flatListRef}
          data={filterData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem(dimensions)}
          keyExtractor={keyExtractor}
          onScroll={handleScroll}
          onScrollBeginDrag={handleStartScroll}
          onScrollEndDrag={handleEndScroll}
          pagingEnabled
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>

      <View style={customStyling.dotsContainer}>{dots}</View>
    </View>
  );
};

const styles = ({isPortrait, width}) => {
  return StyleSheet.create({
    mainContainer: {
      // position: 'relative',
    },
    separator: {
      // Adjust the width for the desired gap
    },
    imageBackground: {
      // position: 'relative',
      width: isPortrait ? width - 20 : width,
      marginTop: 10,
      height: 209.5,
      borderRadius: 12,
      overflow: 'hidden', // This is important for borderRadius to work
      // padding: 20,
      // marginHorizontal: 5
    },
    maintext: {
      fontFamily: 'Montserrat',
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 0,
      color: '#FFFFFF',
    },
    text: {
      fontFamily: 'Montserrat-Light',
      color: 'white',
      fontSize: 16,
      // paddingVertical: 7,
      lineHeight: 16,
    },
    button: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'white',
      height: 'auto',
      width: 'auto',
      justifyContent: 'center',
      flexDirection: 'row',
      // gap: 10,
      padding: 8,
      // paddingLeft: 10,
      // paddingRight: 10,
      // alignItems: 'center',
      // alignSelf:'flex-start'
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      alignSelf: 'center',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    item: {
      width: 350,
      height: 200,
      backgroundColor: '#f9c2ff',
    },
    textOverlay: {
      // position: 'absolute',
      top: 34,
      left: 20,
      marginRight: 40,
      // zIndex: 1,
      // paddingTop: 10,
      //  justifyContent: 'space-around'
    },
  });
};

export default HomeCarousel;
