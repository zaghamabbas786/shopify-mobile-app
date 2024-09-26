import React, { memo } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {Video} from 'expo-av';

const {width} = Dimensions.get('window');

const VideoPlayer = ({videoUrl}) => {
  const isVimeoUrl =
    videoUrl.includes('vimeo.com') || videoUrl.endsWith('.webm');
  const videolink = videoUrl.includes('vimeo.com')
    ? `https://player.vimeo.com/video/${videoUrl
        .split('/')
        .pop()}?background=1&autoplay=1&loop=1&title=0&byline=0&portrait=0`
    : videoUrl;

  if (isVimeoUrl) {
    return (
      <WebView
        style={styles.video}
        javaScriptEnabled
        source={{uri: videolink}}
      />
    );
  }

  return (
    <Video
      source={{uri: videoUrl}}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{width: '100%', height: 200}}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width,
    height: width * 0.56,
  },
});

export default memo(VideoPlayer);
