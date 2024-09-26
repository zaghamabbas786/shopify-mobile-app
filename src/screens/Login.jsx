import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import data from '../../enviroment';

const {store} = data;

const Login = () => {
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
    <View style={{flex: 1}}>
      {/* <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />; */}
      <WebView
        ref={webViewRef}
        source={{uri: `https://${store}/account`}}
        injectedJavaScript={hideHeaderAndFooter}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
