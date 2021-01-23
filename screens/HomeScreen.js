import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import UserDetails from './UserDetails';


export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      ExchangeList : []
    }
  this.requestRef= null
  }

  getAllRequests =()=>{
    this.requestRef = db.collection("exchanges")
    .onSnapshot((snapshot)=>{
    var allRequests = []
    snapshot.forEach((doc) => {
    allRequests.push(doc.data())
    })
    this.setState({ExchangeList:allRequests})
    })
    }

  componentDidMount(){
    this.getAllRequests()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.button}
          onPress={()=>
            {
              this.props.navigation.navigate('Exchanger',{"details":item})
            }}>
            <Text style={{color:'black'}}>Exchange</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#66CCCC'}}>
         
        <MyHeader title="EXCHANGES" navigation={this.props.navigation}/>
        
        <View>
          {
            this.state.ExchangeList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Excahnges</Text>
              </View>
            )
            :(
              <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.ExchangeList}
                renderItem={this.renderItem}
              />
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#66CCCC'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#66CCCC",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
  }
})
