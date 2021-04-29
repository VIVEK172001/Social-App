import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native'
import {
    Footer,
    Header,
    Right,
    Icon,
    Left,
    Input,
    Form,
    Item,
    H1,
    Card,
    CardItem,
    Container,
    Thumbnail
} from 'native-base'
import Comm from '../componenets/Comm'
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import shortid from 'shortid'


const Comment = ({route, navigation, userDetails}) => {
    const item = route.params;
    const [comment, setComment] = useState('')
    var info;
    useEffect(() => {
        console.log("item",item.item.comment)
        if(item.item.comment){
            info = Object.values(item.item.comment)
            console.log("data",info)
        }else{
            info = null;
            console.log("data",info)
        }
    },[])
    const addComment = () => {
        const uid = shortid.generate()
        database()
          .ref(`/posts/${item.item.id}/comment/${uid}`)
          .set({
            id: userDetails.uid,
            by: userDetails.instaUserName,
            logo: userDetails.image,
            comment: comment
          })
          .then(() => console.log("comment added"))
          navigation.navigate('Home')
      }

    return(
        <SafeAreaView style={{flex: 1}}> 
            <Header androidStatusBarColor = "#000000" style={{backgroundColor: "#000000",}}>
                <Left>
                    <Icon 
                        name="arrow-left"
                        type="SimpleLineIcons"
                        style={{left:-80,fontSize: 20, color: '#ffffff'}}
                        onPress={() => navigation.navigate('Home')}
                        />
                </Left>
                    <Text style={{color: '#ffffff', fontSize: 20, left: -150, top: 15}}>
                        Comments
                    </Text>

            </Header>
            <SafeAreaView style={{flex: 1, backgroundColor: '#000000',}}>
                <FlatList
                    data={Object.values(item.item.comment)}
                    keyExtractor={item => item.id}
                    renderItem={(item) => (
                        <Comm item={item} key={item.id} />
                    )}
                    ListEmptyComponent={() => (
                        <Container style={styles.emptyContainer}>
                          <H1>No Comment Yet</H1>
                        </Container>
                      )}
                />
            </SafeAreaView>
            <Footer style={{backgroundColor: "#000000", left: 0, right: 0, bottom: 0}}>
                
                    <Form style={{backgroundColor: "#000000"}}>
                        <Item style={{width: 310,}}>
                            <Input
                                placeholder="Write Your Comment Here...."
                                placeholderTextColor='#898888'
                                backgroundColor="#000000"
                                value={comment}
                                style={styles.input}
                                onChangeText={(text) => setComment(text)}
                            />
                        </Item>
                    </Form>
                
                <Right style={{backgroundColor: "#000000"}}>
                    <Icon
                        name="paper-plane"
                        type="SimpleLineIcons"
                        style={{marginRight: 20, color: '#ffffff', marginTop: 15}}
                        onPress={addComment}
                    />
                </Right>
            </Footer>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.user,
  });

Comment.propTypes = {
    userDetails: propTypes.object.isRequired,
  };

export default connect(mapStateToProps)(Comment);


const styles = StyleSheet.create({
    input: {
      color: '#ffffff',

    },
    emptyContainer: {
        flex: 1,
        backgroundColor: '#1b262c',
        justifyContent: 'center',
        alignItems: 'center',
      },
  });