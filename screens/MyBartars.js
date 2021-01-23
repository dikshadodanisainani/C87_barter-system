import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem,Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyBartars extends Component{
    constructor()
    {
        super()
        this.state={
            donorId:firebase.auth().currentUser.email,
            donorName:'',
            allExchanges:[],
        }
        this.requestRef=null;
    }
    static navigationOptions={
        Header:null
    }

    getDonorDetails=(donorId)=>
    {
        db.collection("users").where("email_id","==",donorId).get()
        .then((snapshot)=>
        {
            snapshot.forEach((doc)=>
            {
                this.setState({
                    donorName:doc.data().first_name + " "+doc.data().last_name,

                })
            })
        })
    }
    sendNotification=(itemDetails,requestStatus)=>{
        var requestId = itemDetails.request_id
        var donorId = itemDetails.donor_id
        db.collection("all_notifications")
        .where("request_id","==", requestId)
        .where("donor_id","==",donorId)
        .get()
        .then((snapshot)=>{
        snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Item Sent"){
        message = this.state.donorName + " Exchange item"
        }else{
        message = this.state.donorName + " has shown interest in your item"
        }
        db.collection("all_notifications").doc(doc.id).update({
        "message": message,
        "notification_status" : "unread",
        "date" : firebase.firestore.FieldValue.serverTimestamp()
        })
        });
        })
        }


    getAllExchanges=()=>
    {
        this.requestRef=db.collection("MyBartars").where("donor_id","==",this.state.donorId)
        .onSnapshot((snapshot)=>
        {
            var allExchanges=[]
            snapshot.docs.map((doc)=>
            {
                var donations=doc.data()
                donations["doc_id"]=doc.id
                allExchanges.push(donations)
            })
            this.setState({
                allExchanges:allExchanges
            })
        })
    }
    sendItem=(itemDetails)=>
    {
        if(itemDetails.request_status==='Item Sent')
        {
            var requestStatus="Interested";
            db.collection("MyBartar").doc(itemDetails.doc_id).update
            (
                {
                    "request_status":"Interested"
                }
            )
            this.sendNotification(itemDetails,requestStatus)
        }
        else{
            var requestStatus="Item Sent"
            db.collection("MyBartars").doc(ItemDetails.doc_id).update({
                "request_status":"Item Sent"
            })
            this.sendNotification(itemDetails,requestStatus)
        }
    }

   
   
      keyExtractor = (item, index) => index.toString()
   
      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
          leftElement={<Icon name="item" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity
               style={[
                 styles.button,
                 {
                   backgroundColor : item.request_status === "Item Sent" ? "green" : "teal"
                 }
               ]}
               onPress = {()=>{
                 this.sendItem(item)
               }}
              >
                <Text style={{color:'#ffff'}}>{
                  item.request_status === "Item Sent" ? "Item Sent" : "Exchange Item"
                }</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
          
   
      componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllExchanges()
      }
    
   
      componentWillUnmount(){
        this.requestRef();
      }
   
      render(){
        return(
          <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="My Bartars"/>
            <View style={{flex:1}}>
              {
                this.state.allExchanges.length === 0
                ?(
                  <View style={styles.subtitle}>
                    <Text style={{ fontSize: 20}}>List of all bartars</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allExchanges}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
      }     
    
   const styles = StyleSheet.create({
     button:{
       width:100,
       height:30,
       justifyContent:'center',
       alignItems:'center',
       shadowColor: "#000",
       shadowOffset: {
          width: 0,
          height: 8
        },
       elevation : 16
     },
     subtitle :{
       flex:1,
       fontSize: 20,
       justifyContent:'center',
       alignItems:'center'
     }
   })