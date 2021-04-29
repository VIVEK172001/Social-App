import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';
import 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


const Post = ({item, userDetails}) => {

    const [vote, setVote] = useState(true)
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)
    const navigation = useNavigation(); 
    useEffect(() => {
      const id = userDetails.uid
      if (item.vote) {
        let upVote = 0
        let downVote = 0
        console.log("post item",item)
        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            
            upVote += 1
            if(val.id === userDetails.uid){
              console.log("in",val.id)
              setVote(false)
            }
          }
          else if (val.downvote) {
            downVote += 1
            setVote(true)
          }
          else{
            setVote(true)
          }
          
        })

        setUpvote(upVote)
        setDownvote(downVote)
        
      }


    }, [item])

    const upVotePost = () => {
      setVote(false);
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          id: userDetails.uid,
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVotePost = () => {
      setVote(true);
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          id: userDetails.uid,
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    

    return (
      <Card
        style={{
          backgroundColor: '#000000',
          borderColor: '#000000',
          borderRadius: 10
        }}>
        <CardItem
          style={{
            backgroundColor: 'transparent',
          }}>
          <Left>
            <Thumbnail source={{uri: item.userImage}} small  style={{marginLeft: -10}}/>
            <Body>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}>
                {item.by}
              </Text>
  
              <Text note style={{
                  color: '#F2EDF2',
                }}>{item.location}</Text>
            </Body>
          </Left>
          <Right>
          <Icon
                name="options-vertical"
                type="SimpleLineIcons"
                style={{fontSize: 20, color: '#ffffff', marginRight: -10}}
              />
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: item.picture}}
            style={{height: 400, width: null, flex: 1}}
          />
        </CardItem>
        
  
        <CardItem
          style={{
            backgroundColor: '#000000',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}>
          <Left>
            {
              vote ? (
                <Button transparent onPress={upVotePost}>
                  <Icon
                    name="heart"
                    type="SimpleLineIcons"
                    style={{fontSize: 25, color: '#ffffff', marginTop: -20, marginLeft: -10}}
                  />
                </Button>
              ):(
                <Button transparent onPress={downVotePost}>
                  <Icon
                    name="heart"
                    type="Ionicons"
                    style={{fontSize: 25, color: 'red', marginTop: -20, marginLeft: -10}}
                  />
                </Button>
              )
            }
            <Button transparent onPress={() => navigation.navigate('Comment',{item: item})}>
              <Icon
                name="bubble"
                type="SimpleLineIcons"
                style={{fontSize: 25, color: '#ffffff', marginTop: -20,}}
              />
            </Button>
            <Button transparent>
              <Icon
                name="paper-plane"
                type="SimpleLineIcons"
                style={{fontSize: 23, color: '#ffffff', marginTop: -20}}
              />
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              iconLeft
              onPress={() => {
                Linking.openURL(`instagram://user?username=${item.instaId}`);
              }}>
              <Icon
                name="social-instagram"
                type="SimpleLineIcons"
              
                style={{fontSize: 25, color: '#ffffff', marginTop: -20, marginRight: -10}}
              />
            </Button>
          </Right>
        </CardItem>
        <CardItem
        style={{
          backgroundColor: 'transparent'
        }}>
          <Text style={{
            color: '#ffffff',
            marginTop: -55,
            marginLeft: -10
          }}>{upvote} Likes</Text>
        </CardItem>
        <CardItem
          cardBody
          style={{
            backgroundColor: 'transparent',
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: '#ffffff',
              marginLeft: 5,
              marginTop: -35
            }}>
            {item.by}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#6FA1C2',
              marginLeft: 15,
              marginTop: -35
            }}>
            {item.description}
          </Text>
        </CardItem>
        <CardItem
        style={{
          backgroundColor: 'transparent'
        }}>
          <Text style={{
            color: '#B2B0B2',
            marginTop: -20,
            fontSize: 12,
            marginLeft: -10,
          }}>{item.date}</Text>
        </CardItem>
      </Card>
    );
  
}

export default Post;