import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useRef, useState } from 'react';
import SingleProductDesign from './SingleProductDesign';
import Right from '../assets/images/right.svg';
import Left from '../assets/images/left.svg';
import _ from 'lodash';
import ArrowRight from '../assets/images/arrow-right.svg';
import CustomRenderHtml from './CustomRenderHtml';
import TouchAbleButton from './TouchAbleButton';
import { hsbToHex } from '../helpers/convertTohex';
const right = <Right />;
const left = <Left />;
const RightArrow = <ArrowRight />;

// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


export default function ProductListingComponent({ title, description, item, data, scrollViewRef, home, nav, gridData }) {
  const { width } = useWindowDimensions();
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentPosition =
      contentOffset.x / (contentSize.width - layoutMeasurement.width);
    setScrollPosition(currentPosition * 100);
  };
  const handleNext = _.debounce(() => {
    const newIndex = currentIndex + 1;
    if (newIndex < data.edges.length && flatListRef.current) {
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ index: newIndex });
    }
  }, 200);

  const handlePrev = _.debounce(() => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0 && flatListRef.current) {
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ index: newIndex });
    }
  }, 200);

  // console.log("DAAAAAAA", data.edges);
  const renderItem = ({ item }) => {
    return <SingleProductDesign data={item.node} scrollViewRef={scrollViewRef} home={home} />
  }
  const viewAll = () => {
    return (
      <View style={styles.viewAll}>

        {/* <RightIcon width={25} height={25} /> */}
      </View>
    );
  };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentFlatListIndex = viewableItems[0].index;
      setCurrentIndex(currentFlatListIndex);
    }
  }).current;
  return (
    <View style={styles.container}>

      {title !== '' && (
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{title ? <CustomRenderHtml
            source={{ html: title }}

          /> : 'Featured'}</Text>
          <TouchAbleButton
            style={[styles.veiwAllBtn, { backgroundColor: hsbToHex(gridData?.backgroundColor) ?? 'white', borderColor: hsbToHex(gridData?.borderColor) ?? '#000' }]}
            // item={<Text style={styles.viewAllTxt}>View All</Text>}
            item={<CustomRenderHtml
              style={styles.viewAllTxt}
              source={{ html: gridData.buttonTxt ?? `<Text>View All</Text>` }}
              contentWidth={width} />}
            onPress={() => nav.navigate('ProductListing', data)} />
        </View>
      )}
      {/* <Text style={styles.description}>{description}</Text> */}

      <View style={styles.products}>
        <FlatList
          data={data.products.edges.slice(0, 5)}
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id}
          onScroll={handleScroll}
          scrollEventThrottle={2}
          // decelerationRate={0.95}
          // initialNumToRender={2}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>

      {/* ------------ Arrow btn for slider -------------- */}
      {/* <TouchAbleButton item={RightArrow} onPress={handleNext} style={styles.arrowBtn}> */}
      {/* <Image source={require('../assets/images/Ellipse.png')} style={{width: 40, height:40, color: '#C4C4C4'}}/> */}
      {/* </TouchAbleButton> */}

      <View style={styles.slider}>
        {/* <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, {width: `${scrollPosition}%`}]} />
          <View
            style={[
              styles.inactiveProgressBar,
              {flex: 3 - scrollPosition / 33},
            ]}
          />
        </View> */}

        {/* <View>
          <ImageBackground source={require('../assets/images/Ellipse.png')} style={{width: 40, height:40, color: '#C4C4C4'}}>
            <TouchAbleButton item={RightArrow} onPress={handlePrev} style={{top:13, left: 15, color: '#232327'}}/>
          </ImageBackground>
        </View> */}

        {/* <View style={styles.arrows}>
          <TouchAbleButton item={left} onPress={handlePrev} />
          <TouchAbleButton item={right} onPress={handleNext} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // backgroundColor: 'red',
    // height: 110
  },
  // description: {
  //   fontFamily: 'Montserrat',
  //   fontWeight: '400',
  //   fontSize: 12,
  //   color: '#777777',
  //   paddingVertical: 5,
  // },
  arrowBtn: {
    top: '34%',
    color: '#232327',
    position: 'absolute',
    marginLeft: '90%',
    width: 30,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5, // For Android
    shadowColor: '#000000', // For iOS
    shadowOffset: {
      width: 8,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4'
  },
  headingContainer: {
    // flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 10,
    // backgroundColor: '#fff'
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    // lineHeight: 22,
    textAlign: 'center',
    // backgroundColor: 'green',
    // left: 1
    marginLeft: 10
  },
  viewAll: {
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
    backgroundColor: 'green'
  },
  viewAllTxt: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 12,
    color: '#000000',
    lineHeight: 14,
  },
  products: {
    display: 'flex',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
    // backgroundColor: 'red'
    // height: 400,
  },
  progressBarContainer: {
    height: 3,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    backgroundColor: 'black',
  },

  inactiveProgressBar: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  arrows: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // gap: 5,
  },
  veiwAllBtn: {
    padding: 5,
    borderWidth: 2,
    // borderColor: '#000',
    // backgroundColor: 'white',
    borderRadius: 4,
    marginRight: 10,
  }
});
