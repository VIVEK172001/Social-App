import React, {useState} from 'react'
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    ImageBackground
} from 'react-native'
import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Thumbnail,
    Content,
    Spinner
} from 'native-base'
import storage from '@react-native-firebase/storage'
import bImage from '../assets/bg.jpg'
import ProgressBar from 'react-native-progress/Bar'
import * as ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options'
import propTypes from 'prop-types'
import {signUp} from '../action/auth'
import {connect} from 'react-redux'
import { color, set } from 'react-native-reanimated'

const SignUp = ({navigation, signUp}) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [instaUserName, setInstaUserName] = useState('')
    const [country, setCountry] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState(
      'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png'
    )
    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [spiner, setSpiner] = useState(false)

    const chooseImage = async() => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                console.log(response)
                uploadImage(response)
              }
             
               
        })
    }
    const uploadImage = async (response) => {
      setImageUploading(true)
      const reference = storage().ref(response.fileName)

      const task = reference.putFile(response.uri)
      task.on('state_changed', (taskSnapshot) => {
          const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

          setUploadStatus(percentage)
      })

      task.then(async () => {
          const url = await reference.getDownloadURL()

          setImage(url)
          setImageUploading(false)
      })
  }
    const doSignUp = async() => {
        setSpiner(true)
        signUp({name, email, password, instaUserName, country, bio, image})
        setSpiner(false)
        
    }

    return (
        <Container style={styles.container}>
          <ImageBackground source={bImage} style={styles.BGImage}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Thumbnail large source={{uri: image}} />
                </TouchableOpacity>
              </View>
    
              {imageUploading && (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
              )}
    
              <Form style={{marginTop: 30, marginLeft: 10, marginRight: 10}}>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="name"
                    placeholderTextColor='#ffffff'
                    value={name}
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="email"
                    placeholderTextColor='#ffffff'
                    value={email}
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="password"
                    placeholderTextColor='#ffffff'
                    value={password}
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Instagram user name"
                    placeholderTextColor='#ffffff'
                    value={instaUserName}
                    style={styles.input}
                    onChangeText={(text) => setInstaUserName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Your Short Bio"
                    placeholderTextColor='#ffffff'
                    value={bio}
                    style={styles.input}
                    onChangeText={(text) => setBio(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="country"
                    placeholderTextColor='#ffffff'
                    value={country}
                    style={styles.input}
                    onChangeText={(text) => setCountry(text)}
                  />
                </Item>
                <Button regular block onPress={doSignUp} style={styles.Signupbutton}>
                  <Text style={{color: '#000000', fontWeight: 'bold'}}>SignUp</Text>
                </Button>
                <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={{marginTop: 10}}>
                <Text style={{color: '#000000', textAlign: 'center'}}>
                 Already have an account? SignIn here
                </Text>
              </TouchableOpacity>
              </Form>
              {
              spiner && (
                <Spinner/>
              )
            }
            </ScrollView>
          </Content>
          </ImageBackground>
        </Container>
      );
}

const mapDispatchToProps = {
    signUp: (data) => signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
    },
    BGImage: {
      width: undefined,
      height: undefined,
      flex: 1,
    },
    Signupbutton: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
    },
    input: {
      color: '#ffffff',

    }
  });