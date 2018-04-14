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
import Nav from './global-widgets/nav';

import firebase from '../config/firebase';

questionAnswerArray = [];
const qData = [{
    "id": 1,
    "question": "Cats or Dogs?",
    "option1": "Cats",
    "option2": "Dogs"
},{
    "id": 2,
    "question": "Red or Blue?",
    "option1": "Red",
    "option2": "Blue"
},{
    "id": 3,
    "question": "Mac or PC?",
    "option1": "Mac",
    "option2": "PC"
},{
    "id": 4,
    "question": "Sand or Snow?",
    "option1": "Sand",
    "option2": "Snow"
},{
    "id": 5,
    "question": "Coffee or Tea?",
    "option1": "Coffee",
    "option2": "Tea"
},{
    "id": 6,
    "question": "Pop or Rap?",
    "option1": "Pop",
    "option2": "Rap"
},{
    "id": 7,
    "question": "Call or Text?",
    "option1": "Call",
    "option2": "Text"
}];


export default class Questionnaire1 extends Component {
    constructor(props){
        super(props);
        this.qno = 0;
        this.checkArray = this.checkArray.bind(this);
        this.state = {
            userId : this.props.userData.userId,
            question : qData[this.qno].question,
            option1 : qData[this.qno].option1,
            option2 : qData[this.qno].option2
        };
        this.componentWillMount = this.componentWillMount.bind(this);

    }

    componentWillMount(){
        this.setState({
            question: qData[0].question,
            option1: qData[0].option1,
            option2: qData[0].option2
        });
        console.log(this.state.userId);
    }

    goHome() {
        this.props.navigator.replace({id: "home"});
    }

    arrayUpdater(question, answer){
        answer = answer.trim().toLowerCase();
        questionAnswerArray.push({question, answer});
        console.log(questionAnswerArray);
        this.forceUpdate();
        this.qno++;
        if (this.qno < qData.length) {
            this.setState({
                userId: this.props.userData.userId,
                question: qData[this.qno].question,
                option1: qData[this.qno].option1,
                option2: qData[this.qno].option2
            });
        }
        else {
            console.log(questionAnswerArray);
            let userRef = firebase.database().ref(`users/${this.state.userId}`);
            userRef.update({surveyResults: questionAnswerArray});
            this.goHome();
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
        return (
            <View style={{flex: 1, backgroundColor: '#15d5ec', alignItems: 'center',
                justifyContent: 'center'}}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
                backgroundColor: 'white',
                width: 300,
                height: 550,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'black'
                }}>
                <Image source = {require('../images/lightning.png')}
                       style = {{height: 70, width: 70, marginTop: 13}}>
                </Image>
                <Text style={styles.qText}>
                    {this.state.question}
                </Text>
                <TouchableHighlight style={this.checkArray(0, this.state.option1) ? styles.test : styles.button}
                                    underlayColor='#15d5ec'
                                    onPress={() => this.arrayUpdater(this.state.question, this.state.option1)}>
                    <Text style={styles.buttonText}>
                        {this.state.option1}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={this.checkArray(0, this.state.option2) ? styles.test : styles.button}
                                    underlayColor='#15d5ec'
                                    onPress={() => this.arrayUpdater(this.state.question, this.state.option2)}>
                    <Text style={styles.buttonText}>
                        {this.state.option2}
                    </Text>
                </TouchableHighlight>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    qText: {
        color: 'black',
        fontSize: 35,
        marginBottom: 80,
        marginTop: 30,
        fontWeight: 'bold',
        fontFamily: 'Avenir-Heavy',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'white',
        width: 200,
        height: 80,
        marginBottom: 30,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 195,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: '600',
        justifyContent: 'center',
        marginTop: 5,
        fontFamily: 'Avenir-Heavy',
    },
});