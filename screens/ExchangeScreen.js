import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';



export default class ExchangeScreen extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            userId:firebase.auth().currentUser.email,
            itemName:'',
            description:'',
            exchangeId:this.createUniqueId
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addItem=(item,description)=>
    {
        var userName=this.state.userId
        var exchangeId = this.createUniqueId()
        db.collection('exchanges').add({
            'user_name':userName,
            'item_name':item,
            'description':description,
            "exchnage_id":exchangeId
        })

    }
    render()
    {
        return(
            <View style={{flex:1,backgroundColor:'#66CCCC'}}>
                
                <MyHeader title="EXCHANGE ITEMS" navigation={this.props.navigation}/>
             
                <KeyboardAvoidingView style={styles.keyBoard}>

                <TextInput
                style={styles.formTextInput}
                placeholder="Item name"
                onChangeText={(text)=>
                {
                    this.setState({itemName:text})
                }}
                value={this.state.itemName}/>

                <TextInput
                style={styles.formTextInput}
                placeholder="description"
                multiline={true}
                numberOfLines={5}
                onChangeText={(text)=>
                {
                    this.setState({description:text})
                }}
                value={this.state.description}/>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>
                {
                    this.addItem(this.state.itemName,this.state.description)
                }}>
                    <Text>ADD ITEM</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        keyBoard:
        {
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#66CCCC',
        },

        formTextInput:
        {
            width:'50%',
            height:35,
            alignSelf:'center',
            borderColor:'#C6E2FF',
            borderRadius:20,
            borderWidth:1,
            marginTop:15,
            padding:10,
            backgroundColor:'white'
        },

        button:
        {
            width:'20%',
            height:50,
            marginTop:20,
            justifyContent:'center',
            alignItems:'center',
            borderWidth:3,
            backgroundColor:'#1E90FF',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.30,
            shadowRadius: 10.32,
            elevation: 16,
            padding: 10
        }

    }
)