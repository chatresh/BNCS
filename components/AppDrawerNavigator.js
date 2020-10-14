import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { DrawerItems , createDrawerNavigator } from 'react-navigation-drawer';

import CustomSideBarMenu from './CustomSideBarMenu'
import  Settings  from './Settings';

import HomeScreen from '../screens/HomeScreen'
import MamyPoko from '../screens/MamyPoko'
import MyShops from '../screens/MyShops'
import MyOrders from '../screens/MyOrders'

export const AppDrawerNavigator = createDrawerNavigator(
 {
   Dashboard:{screen:HomeScreen},
   Settings:{screen:Settings},
   MyShops:{screen:MyShops},
   MyOrders:{screen:MyOrders},
 },
 {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName : "Home"
    }
 )