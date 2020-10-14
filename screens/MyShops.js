import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,ScrollView,TouchableOpacity,TextInput,Dimensions,Animated} from 'react-native';
import { ListItem,Header} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class MyShops extends React.Component{
    constructor(){
        super()
        this.state={
            allShops:[]
        }
    }
    getShopsListToDisplayInFlatList=()=>{
       this.requestRef =  db.collection("shops")
       .onSnapshot((snapshot)=>{
         var allShops = snapshot.docs.map(document => document.data())
         this.setState({allShops:allShops})
       })
    }

    componentDidMount=()=>{
        this.getShopsListToDisplayInFlatList()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem=( {item, i} )=>{
   return (
      <ListItem
        key={i}
        title={item.shopName}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        BottomDivider
      />
    )
  }
    

    render(){
        return(
            <View>
            <ScrollView>
            <MyHeader title="MyShops"/>
             <FlatList
              data={this.state.allShops}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
             />
            </ScrollView>
            </View>
        )
    }
}