import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Cart from '../components/Cart';
import {MenuNavigator} from './MenuNavigator';
import {View} from 'react-native';
const RightDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <View style={{flex:1}}>
      
      <RightDrawer.Navigator
        id="RightDrawer"
        drawerContent={props => <Cart {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            width: '95%',
          },
        }}>
        <RightDrawer.Screen name="CartDrawer" component={MenuNavigator} />
      </RightDrawer.Navigator>
    </View>
  );
};

export default DrawerNavigator;
