import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,ScrollView,TouchableOpacity,TextInput,Dimensions,Animated} from 'react-native';
import { ListItem,Header} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class Payments extends React.Component{
    PaymentsTransactionOfCustomers= async () =>{
     
    }

    updatePaymentsTransactionOfCustomers=()=>{

    }

    render(){
        return(
            <View>
            
            </View>
        )
    }
}