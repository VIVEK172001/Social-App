import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import {
    Body,
    Right,
    Button,
    Icon,
    Header,
    Title,
    Left,
} from 'native-base'
import logo from '../assets/logo.png'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut} from '../action/auth'

const CustomHeader = ({signOut, authState, navigation}) => {
    return(
        <Header
        androidStatusBarColor = "#000000"
        style = {{backgroundColor : "#5A2AEC"}}
        >
            <Body>
            <Image
                source={logo}
                style={{width: 100, height: 60,marginTop:5}}
                resizeMode="contain"
                />
            </Body>
            <Right>
            
            {authState.isAuthenticated && (
                    <>
                    

                    <Button transparent iconLeft onPress={() => navigation.navigate('AddPost')}>
                         <Icon
                            name="plus"
                            type="Feather"
                            style={{fontSize: 25, color: '#ffffff', marginRight: -10}}
                        />   
                    </Button>
                    <Button transparent onPress={() => signOut()}>
                        <Icon name="log-out-outline" style={{color : "#ffffff", fontSize: 25, marginRight: -10}}></Icon>
                    </Button>
                    </>
                )}
            </Right>
        </Header>
    )
}

const mapStateToProps = (state) => ({
    authState : state.auth
})

const mapDispatchToProps = {
    signOut
}

CustomHeader.prototype = {
    signOut : propTypes.func.isRequired,
    authState : propTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);