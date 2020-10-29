import React, { Component } from 'react';
import { View, StyleSheet, Text, 
FlatList,ScrollView,TouchableOpacity,TextInput,Dimensions,Animated} from 'react-native';
import { ListItem,Header} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'

import MamyPoko from './MamyPoko'

export default class HomeScreen extends React.Component{
  constructor(){
    super()
    this.state={
      CompanyName:'',
      allCompanies:[],
      Company:'',
    }
  }
 

  getShopsList =()=>{
    this.requestRef = db.collection("Company")
    .onSnapshot((snapshot)=>{
      var allCompanies = snapshot.docs.map(document => document.data());
      this.setState({
        allCompanies : allCompanies
      });
    })
  }

  componentDidMount=()=>{
    this.getShopsList()   
    }
    

CompanyName=()=>{
  db.collection("Company").add({
    "Name":this.state.CompanyName,
  })
}
  
  Find_And_Navigate_Screen=async()=>{
    await db.collection("Company")
    .onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({Company:doc.data().Name})
      })
    })

      this.props.navigation.navigate("MamyPoko")
      
    
  }

  keyExtractor = (item, index) => index.toString()

  renderShops = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.Name}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
         rightElement={
            <TouchableOpacity style={styles.button} onPress={()=>{
                this.Find_And_Navigate_Screen()
            }}>
              <Text style={{color:'#ffff'}}>Enter</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }


  render(){
       return (
  <View>
  <ScrollView>
      <MyHeader title="BNCS" navigation={this.props.navigation}/>
 <TextInput style={styles.TextInput}
 placeHolder="Enter the Company name"
 onChangeText={(text)=>{this.setState({CompanyName:text})}}
 value={this.state.CompanyName}
 />
  <TouchableOpacity style={styles.registerButton} onPress={()=>{
    this.CompanyName();
  }}>
  <Text style={styles.registerButtonText} >Click to enter list</Text>
  </TouchableOpacity>
      
      <FlatList
   keyExtractor={this.keyExtractor}
   data={this.state.allCompanies}
   renderItem={this.renderShops}
  />
 </ScrollView>
       </View>
  )
    
    
 
  }
}



const styles= StyleSheet.create({
  registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30,
   marginLeft:280
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 TextInput:{
    width:"25%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})

