import React, {useEffect, useRef, useState} from 'react';
import BlogDetailScreen from '../screens/BlogDetailScreen';
import Hompage from '../screens/Hompage';
import CartScreen from '../screens/CartScreen';
import OrderSummeryScreen from '../screens/OrderSummeryScreen';
import ProductDetails from '../screens/ProductDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import ProductListing from '../screens/ProductListing';
import DetailsScreen from '../screens/DetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import { useDispatch, useSelector } from 'react-redux';
import ContactUs from '../screens/ContactUs';
import Login from '../screens/Login';
import DealsScreen from '../screens/DealsScreen';
import { hsbToHex } from '../helpers/convertTohex';
import SvgComponent from '../components/SvgComponent';
import { homeSvgIcon, searchSvgIcon, cartSvgIcon } from '../helpers/svgComponent';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [totalCount, setTotalCount]= useState(0);
  const count = useSelector(state => state.cartCount.count)
  const adminData = useSelector(state => state.adminData.adminData);
  const {bottomBarRes} = adminData;
  const bottomData = bottomBarRes?.bottomBarData ?  JSON.parse(bottomBarRes?.bottomBarData) : null;
  const navigation = useNavigation();
  
  const hexaBg = bottomData?.backgroundColor && hsbToHex(bottomData?.backgroundColor)
  const hexaBadgeColor = bottomData?.badgeColor && hsbToHex(bottomData?.badgeColor)
  const hexaBadgeCountColor = bottomData?.badgeCountColor && hsbToHex(bottomData?.badgeCountColor)
  const hexalabelOneActiveColor = bottomData?.activeColor && hsbToHex(bottomData?.activeColor)
  const hexalabelOneInActiveColor = bottomData?.inActiveColor && hsbToHex(
    bottomData?.inActiveColor,
  );

  useEffect(()=>{
    setTotalCount(count)
  },[count])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;
          let iconStyle = {};
          let svgColor = '';

          if (route.name === 'Home') {
            if (!bottomData?.homeSvg.trim()) {
              iconSource = homeSvgIcon;
              svgColor = focused ? '#D89471' : '#000000';
            } else {
              iconSource = bottomData?.homeSvg;
              svgColor = focused
                ? hexalabelOneActiveColor
                : hexalabelOneInActiveColor;
            }
          } else if (route.name === 'CartScreen') {
            if (!bottomData?.cartSvg.trim()) {
              iconSource = cartSvgIcon;
              svgColor = focused ? '#D89471' : '#000000';
            } else {
              iconSource = bottomData?.cartSvg;
              svgColor = focused
                ? hexalabelOneActiveColor
                : hexalabelOneInActiveColor;
            }
          } else if (route.name === 'Search') {
            if (!bottomData?.searchSvg) {
              iconSource = searchSvgIcon;
              svgColor = focused ? '#D89471' : '#000000';
            } else {
              iconSource = bottomData?.searchSvg;
              svgColor = focused
                ? hexalabelOneActiveColor
                : hexalabelOneInActiveColor;
            }
          }

          return (
            <View style={[styles.tabIconWrapper, iconStyle]}>
              <SvgComponent
                uri={iconSource}
                color={svgColor}
                width={25}
                height={25}
              />
            </View>
          );
        },
        headerShown: false,
        tabBarActiveTintColor: hexalabelOneActiveColor,
        tabBarInactiveTintColor: hexalabelOneInActiveColor,

        tabBarStyle: {
          backgroundColor: hexaBg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarBadgeStyle: {
          backgroundColor: hexaBadgeColor, // Use the calculated hexaBadgeColor
          color: hexaBadgeCountColor, // Use the calculated hexaBadgeCountColor
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Hompage}
        options={{
          tabBarLabel: 'Home', // Customize the label for this screen
          // tabBarStyle: {}, // Custom style for the tab bar
        }}
      />
      {/* <Tab.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={{
          tabBarLabel: 'Wishlist', // Customize the label for this screen
          tabBarStyle: {}, // Custom style for the tab bar
        }}
      />*/}
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.getParent('RightDrawer').openDrawer();
          },
        })}
        options={{
          tabBarLabel: 'Cart', // Customize the label for this screen
          // tabBarStyle: {}, // Custom style for the tab bar
          tabBarBadge: totalCount,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        // listeners={() => ({
        //   tabPress: e => {
        //     e.preventDefault();
        //     dispatch(setFocus(true));
        //   },
        // })}
        options={{
          tabBarLabel: 'Search', // Customize the label for this screen
          // tabBarStyle: {}, // Custom style for the tab bar
        }}></Tab.Screen>

      {/* <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Setting', // Customize the label for this screen
          tabBarStyle: {}, // Custom style for the tab bar
        }}
      /> */}
      <Tab.Screen
        name="BlogDetailScreen"
        component={BlogDetailScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="DealsScreen"
        component={DealsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="OrderSummery"
        component={OrderSummeryScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="PDP"
        component={ProductDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ProductListing"
        component={ProductListing}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarButton: () => null,
        }}
      />
      {/* Add more Tab.Screen components as needed */}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    // Define styles for active icons
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.17,
    shadowRadius: 14,
    backgroundColor: '#fff',
    padding: 15,
    display: 'block',
    elevation: 7,
    borderRadius: 50,
  },
  inactiveIcon: {
    // Define styles for inactive icons
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.17,
    shadowRadius: 14,
    backgroundColor: '#fff',
    padding: 15,
    display: 'block',
    elevation: 7,
    borderRadius: 50,
    paddingRight: 16
  },
  tabIconWrapper: {
    // width: 40, // Adjust as needed
    // height: 40, // Adjust as needed
    // borderRadius: 30, // Make it a circle for a circular shadow
    // justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
export default BottomTabNavigator;
