import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler'
import {
    Text,
} from 'react-native'
import {
    Left,
    Card,
    Thumbnail,
    CardItem
} from 'native-base'

const Comm = ({item}) => {
    useEffect(() => {
        console.log("item2",item)
    },[])
    return(
        <Card style={{backgroundColor: '#000000', borderColor: '#000000',}}>
            <CardItem style={{marginBottom:-10, backgroundColor: '#000000'}}>
                <Left>
                <Thumbnail source={{uri: item.item.logo}} small  style={{marginLeft: -10}}/>
                <Text style={{color: '#ffffff', marginLeft: 10}}>{item.item.by+"   "}</Text>
                <Text style={{color: '#B5DEFA'}}>{item.item.comment}</Text>
                </Left>
            
            </CardItem>
        </Card>      
    )
};

export default Comm;