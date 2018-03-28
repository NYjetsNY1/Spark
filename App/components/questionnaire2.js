//second questionnaire page

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


export default class Questionnaire2 extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.page}>
                <Text style = {styles.qText} >
                    Are you an extrovert or an introvert?
                </Text>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {style = styles.buttonClicked}>
                    <Text style = {styles.buttonText}>
                        Extrovert
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {style = styles.buttonClicked}>
                    <Text style = {styles.buttonText}>
                        Introvert
                    </Text>
                </TouchableHighlight>
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
        color: '#15d5ec',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 60
    },
    button: {
        backgroundColor: '#15d5ec',
        width: 220,
        height: 60,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 27,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 13,
        fontFamily: 'Avenir-Heavy'
    },
    buttonClicked: {
        backgroundColor: '#14b2ec',
        width: 220,
        height: 60,
        marginBottom: 20
    }
});