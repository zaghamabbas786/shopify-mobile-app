import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerScreen from '../screens/DrawerScreen';
import BottomTabNavigator from './BottomNavigator';
import CustomHeader from '../components/CustomHeader';

const LeftDrawer = createDrawerNavigator();

const MenuNavigator = ({route}) => {
  return (
    <LeftDrawer.Navigator
      initialRouteName="BottomNavigator"
      drawerContent={DrawerScreen}
      id="LeftDrawer"
      screenOptions={{
        header: () => <CustomHeader />,
        drawerStyle: {
          width: '95%',
        },
      }}>
      <LeftDrawer.Screen
        name="BottomNavigator"
        component={BottomTabNavigator}
      />
    </LeftDrawer.Navigator>
  );
};

export {MenuNavigator};
