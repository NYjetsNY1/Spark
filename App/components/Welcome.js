//a welcome screen

import React, { Component } from 'react';
import {

    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';


import Home from './home';

//var {height, width} = Dimensions.get('window');


export default class Welcome extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.wel}>
                <Image source = {require('../images/logo.png')}
                       style = {styles.welImage}>
                </Image>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {() => this.props.navigator.replace({id: "home"})}>
                    <Text style = {styles.welButtonText}>
                        LOG IN
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {() => this.props.navigator.replace({id: "home"})}>
                    <Text style = {styles.welButtonText}>
                        SIGN UP
                    </Text>
                </TouchableHighlight>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    wel: {backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'},
    welText: {
        color: '#15d5ec',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 60
    },
    welImage: {
        width: 200,
        height: 100,
        marginBottom: 200
    },
    welButton: {
        backgroundColor: '#15d5ec',
        width: 220,
        height: 60,
        marginBottom: 20
    },
    welButtonText: {
        color: 'white',
        fontSize: 27,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 13,
        fontFamily: 'Avenir-Heavy'
    }
});