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


export default class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userData.userId,
    };
        this.questionnaire = this.questionnaire.bind(this);
    }

    questionnaire(){
        this.props.navigator.replace({id: "questionnaire"});
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
                           style = {{height: 70, width: 70, marginTop: 12}}>
                    </Image>
                    <Text style={styles.qText}>
                        Welcome to Spark!
                    </Text>
                    <Text style={styles.iText}>
                        Please answer the following questions to let us get to know you a little better. The purpose of
                        the questions is to get your first instinct, so answer as quick as you can /n Good luck!
                    </Text>
                    <TouchableHighlight style={styles.button}
                                        onPress={this.questionnaire}>
                        <Text style={styles.buttonText}>
                            I'm Ready!
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
        fontSize: 24,
        marginBottom: 10,
        marginTop: 30,
        fontWeight: 'bold',
        fontFamily: 'Avenir-Heavy',
        textAlign: 'center'
    },
    iText: {
        color: 'black',
        fontSize: 15,
        marginBottom: 55,
        marginTop: 10,
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
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '600',
        justifyContent: 'center',
        marginTop: 5,
        fontFamily: 'Avenir-Heavy',
    },
});