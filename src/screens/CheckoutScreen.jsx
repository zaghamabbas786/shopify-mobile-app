import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {setCartId} from '../redux/slices/CartIdHandle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {addItemTocart} from '../redux/slices/CartSlice';
import {View} from 'react-native';
import SuccessPayment from '../assets/images/paymentDone.svg';
import TouchAbleButton from '../components/TouchAbleButton';
import data from '../../enviroment';

const CheckoutScreen = props => {
  const {checkoutUrl} = props.route.params;
  const navigation = useNavigation();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const clearCartItem = async () => {
    try {
      await AsyncStorage.removeItem('CartItem');

      dispatch(setCartId(true));
      dispatch(addItemTocart(true));
    } catch (error) {}
  };

  const {StoreFrontUrl} = data;
  const url = StoreFrontUrl.split('api')[0];

  const successBtn = () => <SuccessPayment width={331} height={201} />;
  const stopContinueShoping = `
  
   const interval = setInterval(() => {
    const header = document.querySelector('.QT4by span');

    if (header && header.textContent == 'Continue shopping') {
        header.parentNode.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.ReactNativeWebView.postMessage('navigate');
        };
        clearInterval(interval);
        console.log("found");
    } else {
        console.log("running");
    }
}, 500);
 `;
  const handleWebViewMessage = event => {
    if (event.nativeEvent.data === 'navigate') {
      navigation.replace('DrawerScreen');
    }
  };
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <WebView
        source={{uri: checkoutUrl}}
        onNavigationStateChange={async navState => {
          if (navState.url.includes('thank-you')) {
            await clearCartItem();
            setTimeout(() => {
              setSuccess(true);
            }, 2000);
          } else if (navState.url == url) {
            navigation.replace('DrawerScreen');
          }
        }}
        injectedJavaScript={stopContinueShoping}
        javaScriptEnabled={true}
        onMessage={handleWebViewMessage}
      />
      {success && (
        <TouchAbleButton
          item={successBtn()}
          style={{
            position: 'absolute',
            top: 220,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
          onPress={() => navigation.replace('DrawerScreen')}
        />
      )}
    </View>
  );
};

export default CheckoutScreen;
