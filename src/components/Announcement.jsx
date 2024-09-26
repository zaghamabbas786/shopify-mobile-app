import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomRenderHtml from './CustomRenderHtml';
import {useSelector} from 'react-redux';
import {hsbToHex} from '../helpers/convertTohex';
import SvgComponent from './SvgComponent';
import {CrossIconSvg} from '../helpers/svgComponent';

const {width: screenWidth} = Dimensions.get('window');

export default function Announcement({setAnnouncementVisible}) {
  const flatListRef = useRef(null);
  const announcement = useSelector(
    state => state.adminData.adminData.announcementRes,
  );

  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const announcementData = announcement?.announcmentText
      ? JSON.parse(announcement.announcmentText)
      : [];
    if (announcementData.length == 0) {
      setAnnouncementVisible(false);
    } else if (announcementData.length == 1) {
      setData(announcementData);
    } else {
      setData(repeatData(announcementData, 50));
    }
  }, [announcement]);

  const repeatData = useCallback((data, times) => {
    return Array.from({length: times}, () => data).flat();
  }, []);
 useEffect(() => {
   if (data?.length > 1) {
     const interval = setInterval(() => {
       let newPosition = scrollPosition + screenWidth;

       if (newPosition >= screenWidth * (data.length - data.length / 3)) {
         newPosition = 0; // Reset to the start
         flatListRef.current?.scrollToOffset({
           offset: newPosition,
           animated: false,
         });
       } else {
         flatListRef.current?.scrollToOffset({
           offset: newPosition,
           animated: true,
         });
       }

       setScrollPosition(newPosition);
     }, 4000);

     return () => clearInterval(interval);
   }
 }, [data, scrollPosition]);


  const announcementSvgColor = announcement?.announcementSvgColor && hsbToHex(
    JSON.parse(announcement?.announcementSvgColor),
  );
const getItemLayout = useCallback(
  (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  }),
  [],
);
  const renderContent = useCallback(({item, index}) => {
    const hexColor = hsbToHex(item.backgroundColor);
    const textAlignment = announcement?.alignAnnounceText
      ? JSON.parse(announcement.alignAnnounceText)
      : null;

    if (item.content === '') {
      return <View key={index} />;
    } else {
      return (
        <View
          key={index}
          style={[styles.announcementContainer, {backgroundColor: hexColor}]}>
          <View style={{width: '90%'}}>
            <View
              style={{
                alignSelf: textAlignment ? textAlignment : 'flex-start',
                marginLeft: 10,
              }}>
              <CustomRenderHtml
                source={{html: item.content}}
                tagsStyles={{
                  img: {display: 'inline-block'},
                  p: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                  },
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setAnnouncementVisible(false)}
            style={styles.crossButton}>
            <SvgComponent
              uri={
                announcement.crossIcon ? announcement.crossIcon : CrossIconSvg
              }
              width={15}
              height={15}
              color={announcementSvgColor}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }, []);
  const keyExtractor = useCallback((_, index) => `${index}`, []);
  return (
    <View style={styles.container}>
      {data && <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderContent}
        ref={flatListRef}
        getItemLayout={getItemLayout}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  announcementContainer: {
    width: screenWidth,
    display: 'flex',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossButton: {
    width: '10%',
    height: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
