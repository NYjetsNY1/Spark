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
    "question": "Are you a dog person or cat person?",
    "option1": "Dog",
    "option2": "Cat"
},{
    "id": 2,
    "question": "Would you rather go out dancing or stay in and watch a movie?",
    "option1": "Dancing",
    "option2": "Movie"
},{
    "id": 3,
    "question": "Coke or pepsi?",
    "option1": "Coke",
    "option2": "Pepsi"
},{
    "id": 4,
    "question": "Would you rather go on a week long backpacking trip or a week long cruise?",
    "option1": "Backpacking trip",
    "option2": "Cruise"
},{
    "id": 5,
    "question": "Are you looking for a hookup or something more serious?",
    "option1": "A hookup",
    "option2": "Something serious"
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
        return(
            <ScrollView style={{backgroundColor: 'white', paddingTop: 10}}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between",
                        alignItems: 'center',}}>
                        <Text style = {styles.qText} >
                            {this.state.question}
                            </Text>
                        <TouchableHighlight style = {this.checkArray(0, this.state.option1) ? styles.test : styles.button} underlayColor='#15d5ec'
                                            onPress = {() => this.arrayUpdater(this.state.question, this.state.option1)}>
                            <Text style = {styles.buttonText}>
                                {this.state.option1}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style = {this.checkArray(0, this.state.option2) ? styles.test : styles.button} underlayColor='#15d5ec'
                                            onPress = {() => this.arrayUpdater(this.state.question, this.state.option2)}>
                            <Text style = {styles.buttonText}>
                                {this.state.option2}
                            </Text>
                        </TouchableHighlight>
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