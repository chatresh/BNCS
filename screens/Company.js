import React, { Component } from 'react';
import { View, StyleSheet, Text, 
FlatList,ScrollView,TouchableOpacity,TextInput,Dimensions,Animated} from 'react-native';
import { ListItem,Header} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader'
import MamyPoko from './MamyPoko'

export default class Company extends React.Component{
     constructor(){
    super()
    this.state={
      Company:'',
      allCompanies:[],
      docid:'',

      apsaraDoc:'',
    }
  }
 
  getCompanyList =()=>{
    this.requestRef = db.collection("companies")
    .onSnapshot((snapshot)=>{
      var allCompanies = snapshot.docs.map(document => document.data());
      this.setState({
        allCompanies : allCompanies
      });
    })

                                                          
  }
 
  updateMarkAsRead=(notification)=>{
     db.collection("shops").doc(notification.doc_id).update({
         "notification_status":"read"
     })
    }
    
    onChangeSwipeValue=(swipeData)=>{
      var allNotifications = this.state.allCompanies
      const {key,value} = swipeData
      if (value<-Dimensions.get('window').width) {
          const newData = [...this.state.allCompanies]
          const preIndex = allNotifications.findItem((item)=>{
            this.updateMarkAsRead(allNotifications[preIndex])
             newData.splice(preIndex,1)
             this.setState({allCompanies:newData})
          })
      }
    }
    
     updateCompanyNameInListItemForShop=()=>{
  db.collection("companies").add({
    "Name":this.state.Company
  })
  this.setState({Company:''})
}


 docIds=()=>{
   db.collection("companies").where("Name","==","Apsara")
   .onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
       this.setState({apsaraDoc:doc.id})
     })
   })
 }

    componentDidMount=()=>{
        this.getCompanyList();
        this.docIds();
    }
    
 renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.Name}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button} onPress={()=>{
                db.collection("companies")
                .onSnapshot((snapshot)=>{
                  snapshot.forEach((doc)=>{
                      this.setState({docs:doc.id})
                  })
                })

               
            }}
       
            >
              <Text style={{color:'#ffff'}}>Enter</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }
  render(){
       return(
        <View>
       <ScrollView>
         <MyHeader title="BNCS" navigation={this.props.navigation}/>
  
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
   placeHolder="Company name"
    onChangeText={(text)=>{this.setState({Company:text})}}
    value={this.state.Company}
   />
   <TouchableOpacity style={styles.registerButton} onPress={()=>{
     this.updateCompanyNameInListItemForShop();
   }}>
   <Text style = {styles.registerButtonText}>Add</Text>
   </TouchableOpacity>

   <SwipeListView
            disableRightSwipe
            data={this.state.allCompanies}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-Dimensions.get('window').width}
            previewRowKey={0}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={this.onChangeSwipeValue}
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

