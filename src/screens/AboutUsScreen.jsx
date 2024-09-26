import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const AboutUsScreen = () => {
  const webViewRef = useRef(null);

  const hideHeaderAndFooter = `
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
  `;
  return (
    <View style={{flex:1}}>
      {/* <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />; */}
      <WebView
        ref={webViewRef}
        source={{uri: 'https://giftapp-dev-qa.myshopify.com/pages/about-us'}}
        injectedJavaScript={hideHeaderAndFooter}
        javaScriptEnabled={true}
      />
    </View>
  )
}

export default AboutUsScreen

const styles = StyleSheet.create({})