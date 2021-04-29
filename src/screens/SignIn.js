import React, {useState} from 'react'
import {StyleSheet, ScrollView, Image, TouchableOpacity,ImageBackground} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Spinner
} from 'native-base'
import bImage from '../assets/bg.jpg'
import Ilogo from '../assets/logo1.png'
import Flogo from '../assets/logo.png'


import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import propTypes from 'prop-types'

const SignIn = ({navigation, signIn}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [spiner, setSpiner] = useState(false)

    const doSignIn = () => {
        setSpiner(true)
        signIn({email, password})
        setSpiner(false)
    }

    return (
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <ImageBackground source={bImage} style={styles.BGImage}>    
            <Image
              source={Ilogo}
              style={{width: null, height: 90, marginTop: 30}}
              resizeMode="contain"
            />
            <Image
              source={Flogo}
              style={{width: null, height: 50, marginTop: 30}}
              resizeMode="contain"
            />
    
            <Form style={{marginTop: 30, marginLeft: 20, marginRight: 20}}>
              <Item regular style={styles.formItem}>
                <Input
                  placeholder="enter your registerd email"
                  value={email}
                  placeholderTextColor='#ffffff'
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Item regular style={styles.formItem}>
                <Input
                  placeholder="enter your registerd password"
                  value={password}
                  secureTextEntry={true}
                  placeholderTextColor='#ffffff'
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
              <Button block onPress={doSignIn} style={styles.Signipbutton}>
                <Text style={{color: '#000000'}}>SignIn</Text>
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{marginTop: 10}}>
                <Text style={{color: '#000000', textAlign: 'center'}}>
                  Do not have an account, SignUp here
                </Text>
              </TouchableOpacity>
            </Form>
            {
              spiner && (
                <Spinner/>
              )
            }
            
            </ImageBackground>
          </ScrollView>
        </Container>
      );
}


const mapDispatchToProps = {
    signIn: (data) => signIn(data)
}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#fdcb9e',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      marginBottom: 20,
    },
    BGImage: {
      width: undefined,
      height: undefined,
      flex: 1,
    },
    BGImage: {
      width: undefined,
      height: undefined,
      flex: 1,
    },
    Signipbutton: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
    },
    input: {
      color: '#ffffff',
    }
  });
  