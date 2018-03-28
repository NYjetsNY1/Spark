//first questionnaire page

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
    TouchableHighlight
} from 'react-native';


import Home from './home';
import Nav from './global-widgets/nav'

export default class Questionnaire1 extends Component {
    constructor(props){
        super(props);
    }

    doNothing(){

    }

    render(){
        return(
            <View style={styles.page}>
                <ScrollView>
                <Text style = {styles.qText} >
                    Are you an extrovert or an introvert?
                </Text>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Extrovert
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Introvert
                    </Text>
                </TouchableHighlight>

                <Text style = {styles.qText} >
                    Are you neat or messy?
                </Text>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Neat
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Messy
                    </Text>
                </TouchableHighlight>

                <Text style = {styles.qText} >
                    Do you prefer to go out or stay in?
                </Text>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Go out
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Stay in
                    </Text>
                </TouchableHighlight>

                <Text style = {styles.qText} >
                    Do you like to plan ahead or improvise?
                </Text>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Plan ahead
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} underlayColor='#15d5ec'
                                    onPress = {this.doNothing()}>
                    <Text style = {styles.buttonText}>
                        Improvise
                    </Text>
                </TouchableHighlight>

                <Nav type = 'q1'
                     goHome = {() => this.props.navigator.replace({id: "home"})}/>
                </ScrollView>
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
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 4,
        fontFamily: 'Avenir-Heavy'
    },
});