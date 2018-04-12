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

questionAnswerArray = [];
const qData = [{
    "id": 1,
    "question": "Are you an extrovert or an introvert?",
    "option1": "Extrovert",
    "option2": "Introvert"
},{
    "id": 2,
    "question": "Are you messy or neat?",
    "option1": "Messy",
    "option2": "Neat"
},{
    "id": 3,
    "question": "Do you prefer to go out or stay in?",
    "option1": "Go out",
    "option2": "Stay in"
},{
    "id": 4,
    "question": "Do you like to plan ahead or improvise?",
    "option1": "Plan ahead",
    "option2": "Improvise"
},{
    "id": 5,
    "question": "Do you get along better with extroverts or introverts?",
    "option1": "Extroverts",
    "option2": "Introverts"
},{
    "id": 6,
    "question": "Would you consider yourself a religious person?",
    "option1": "Yes",
    "option2": "No"
},{
    "id": 7,
    "question": "Are you looking for a hookup or something more?",
    "option1": "Hookup",
    "option2": "Something more"
}]


export default class Questionnaire1 extends Component {
    constructor(props){
        super(props);
        this.qno = 0;
        this.checkArray = this.checkArray.bind(this);
        this.state = {
            question : qData[this.qno].question,
            option1 : qData[this.qno].option1,
            option2 : qData[this.qno].option2
        }
    }

    goWelcome() {
        this.props.navigator.replace({id: "welcome"});
    }

    arrayUpdater(status, question, answer, position){
        questionAnswerArray[position] = {question, answer};
        console.log(questionAnswerArray);
        this.forceUpdate();
        this.qno++;
        if (this.qno < qData.length) {
            this.setState({
                question: qData[this.qno].question,
                option1: qData[this.qno].option1,
                option2: qData[this.qno].option2
            });
        }
        else {
            this.goWelcome();
        }
    }

    checkArray(position, answer) {
        if (questionAnswerArray[position] != undefined) {
            if (questionAnswerArray[position].answer === answer) {
                return true;
            }
        }
        return false;
    }

    render(){
        return(
            <ScrollView style={{backgroundColor: 'white', paddingTop: 10}}>
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between",
                        alignItems: 'center',}}>
                        <Text style = {styles.qText} >
                            Are you an extrovert or an introvert?
                        </Text>
                        <TouchableHighlight style = {this.checkArray(0, this.state.option1) ? styles.test : styles.button} underlayColor='#15d5ec'
                                            onPress = {() => this.arrayUpdater(this.state.question, this.state.option2, 0)}>
                            <Text style = {styles.buttonText}>
                                {this.state.option1}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style = {this.checkArray(0, this.state.option2) ? styles.test : styles.button} underlayColor='#15d5ec'
                                            onPress = {() => this.arrayUpdater(this.state.question, this.state.option2, 0)}>
                            <Text style = {styles.buttonText}>
                                {this.state.option2}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
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