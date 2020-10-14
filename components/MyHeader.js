import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase'


const MyHeader = props => {
    return(
         <Header

          centerComponent={
              {
                  text:props.title,

                  style:{
                  
                   color:"#7bfaf3",
                    fontSize:20,
                    fontWeight:"bold",
                    width:1200,
                    textAlign:"center"
                  }
              }
          }
            backgroundColor="#6adcf1"  
       />
    )
}
export default MyHeader