import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextInput} from 'react-native';
import { ListItem,Header} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class MamyPoko extends React.Component{
    constructor(){
        super();
        this.state={
            Item:'',
            allItems:[],
            Pieces:''
        }
    }
   
   getItemList =()=>{
   db.collection("Mamypoko")
    .onSnapshot((snapshot)=>{
      var allItems = snapshot.docs.map(document => document.data());
      this.setState({
        allItems : allItems
      });
    })
  }

  componentDidMount=()=>{
    this.getItemList()
    }

updateCompanyNameInListItemForShop=()=>{
  db.collection("Mamypoko").add({
    "Name":this.state.Item
  })
  this.setState({Item:''})
}

  keyExtractor = (item, index) => index.toString()

 renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.Name}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <View>
            <TextInput style={styles.TextInput} 
             onChangeText={(text)=>{this.setState({Pieces:text})}}
             keyBoardType="numeric"
             value={this.state.Pieces}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{
                 this.props.navigation.navigate('MamyPokoScreen')
            }}>
              <Text style={{color:'#ffff'}}>Add</Text>
            </TouchableOpacity>
            </View>
          }
        bottomDivider
      />
    )
  }


    render(){
      return(
        <View>
        <Header
       centerComponent={{ text: "BNCS", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
   /> 
   <Text style={{textAlign:"center",fontWeight:"Bold",fontSize:25}}>{this.state.shopName}</Text>
   <TextInput style={{
  width:"25%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:50,
   padding:10
   }}
   placeHolder="Item name"
    onChangeText={(text)=>{this.setState({Item:text})}}
    value={this.state.Item}
   />
   <Text>{this.state.Item}</Text>
   <TouchableOpacity style={styles.registerButton} onPress={()=>{
     this.updateCompanyNameInListItemForShop();
   }}>
   <Text style = {styles.registerButtonText}>Add</Text>
   </TouchableOpacity>

   <FlatList
   keyExtractor={this.keyExtractor}
   data={this.state.allItems}
   renderItem={this.renderItem}
              />
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
   marginTop:0,
   padding:10,
   marginLeft:50
 },
 button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    marginTop:-35,
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})

