import CustomHeader from '../components/CustomHeader';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import Hompage from '../screens/Hompage';
import CollectionPage from '../screens/Collections';
import ProductListing from '../screens/ProductListing';
import {Splash} from '../screens/Splash';
import BlogScreen from '../screens/BlogScreen';
import BlogDetailScreen from '../screens/BlogDetailScreen';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckoutScreen from '../screens/CheckoutScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setCartId} from '../redux/slices/CartIdHandle';
import apiClient from '../api/apiClient';
import {addAdminData} from '../redux/slices/AdminDataSlice';
import axios from 'axios';
import data from '../../enviroment';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const dispatch = useDispatch();
  const {AppUrl, store} = data;
  const cartid = useSelector(state => state.cartId.cartId);
  const adminData = useSelector(state => state.adminData.adminData);

  useEffect(() => {
    const fetchSplashData = async () => {
      try {
        const res = await axios.get(AppUrl + 'api/denver', {
          headers: {
            store,
          },
        });
        const data = res.data;
        dispatch(addAdminData(data));
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchSplashData();
  }, []);

  const cartCreate = async () => {
    try {
      let cart = await AsyncStorage.getItem('CartItem');

      if (cart) {
        return;
      }

      const graphqlMutation = `
      mutation {
        cartCreate {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `;

      const response = await apiClient.post('', {
        query: graphqlMutation,
      });

      if (response.data.errors) {
        console.error('GraphQL mutation error:', response.data.errors);
      } else {
        const {checkoutUrl, id} = response.data.data.cartCreate.cart;
        console.log('Cart created successfully:', checkoutUrl, id);

        await AsyncStorage.setItem(
          'CartItem',
          JSON.stringify({checkoutUrl, id}),
        );
      }
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  useEffect(() => {
    cartCreate();
  }, []);

  useEffect(() => {
    if (cartid) {
      cartCreate();
      dispatch(setCartId(false));
    }
  }, [cartid]);
  if (Object.keys(adminData) == 0) return;
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={({route}) => ({
        headerShown: false, // Show header for all screens except Splash
      })}>
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
