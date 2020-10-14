import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen'
import Company from '../screens/Company'

import Apsara from '../screens/Apsara'
import MamyPoko from '../screens/MamyPoko'

export const AppStackNavigator = createStackNavigator({
  Dashboard:{screen:HomeScreen},
  Apsara:{screen:Apsara},
  Company:{screen:Company},
  MamyPoko:{screen:MamyPoko} ,
},
{
    intialRouteName:"BookDonateList"
}

)
