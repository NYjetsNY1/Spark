import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
    TouchableHighlight,
    TextInput
} from 'react-native';

import Home from './home';
import Nav from './global-widgets/nav'

export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userData.userId,
            bio : ""
        }
    }

    goHome() {
        this.props.navigator.replace({id: "home"});
    }

    render() {
        return(
            <View style={styles.page}>
                <TextInput style={{height: 60, width: 90, borderColor: 'gray', borderWidth: 1}}
                           multiline = {true}
                           numberOfLines = {4}
                           defaultValue = {"Let other users know what you're thinking"}
                           onChangeText={(text) => this.setState({bio : text})}
                           value = {this.state.bio}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    page: {backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'},
    qText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginTop: 50,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#15d5ec',
        width: 200,
        height: 40,
        marginBottom: 15,
        marginLeft: 86,
        justifyContent: 'center',
        alignItems: 'center'
    },
    test: {
        backgroundColor: '#0a6b76',
        width: 200,
        height: 40,
        marginBottom: 15,
        marginLeft: 86,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 4,
        fontFamily: 'Avenir-Heavy'
    },
    card: {
        flex: 1,
        alignItems: 'center',
        alignSelf:'center',
        width: 350,
        height: 420,
    }

});