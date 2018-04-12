/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

export default class Nav extends Component {

    welcome(){
        return(
            <View style={styles.wel}>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {this.props.onLogin}>
                    <Text style = {styles.welButtonText}>
                        LOG IN
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.welButton} underlayColor='#15d5ec'
                                    onPress = {this.props.onRegister}>
                    <Text style = {styles.welButtonText}>
                        SIGN UP
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    questionnaire1(){
        return(
        <View style={styles.wel}>
            <TouchableHighlight style = {styles.qButton} underlayColor='#15d5ec'
                                onPress = {this.props.goHome}>
                <Text style = {styles.welButtonText}>
                    NEXT
                </Text>
            </TouchableHighlight>
        </View>
            );
    }


    home(){
        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress ={this.props.toProfile}>
                    <Iconz name="ios-person" color ="#888" size={25} style={{margin:10}} />
                </TouchableOpacity>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                <TouchableOpacity onPress ={this.props.chat}>
                    <Iconz name="ios-chatboxes-outline" color ="#555" size={25} style={{margin:10}} />
                </TouchableOpacity>
            </View>
        );
    }

    profile(){
        return (
            <View  style={styles.container}>
                <View style = {{width:25, height:25, margin:10}}/>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                <TouchableOpacity onPress ={this.props.onPress}>
                    <Image source = {require('../../images/lightning.png')} style = {{width:25, height:25, margin:10}}/>
                </TouchableOpacity>
            </View>
        );
    }

    message(){
        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress ={this.props.onPress}>
                    <Image source = {require('../../images/lightning.png')} style = {{width:25, height:25, margin:10}}/>
                </TouchableOpacity>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                <View style = {{width:25, height:25, margin:10}}/>
            </View>
        );
    }

    directMessage(){
        let imageSrc = ' ';
        if(this.props.image) imageSrc = this.props.image;
        return(
            <View  style={styles.container}>
                <TouchableOpacity onPress ={this.props.chat}>
                    <Iconz name="ios-chatboxes-outline" color ="#555" size={25} style={{margin:10}} />
                </TouchableOpacity>
                <TouchableOpacity onPress ={this.props.toProfile} style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5}}>
                    <Image source = {{uri:imageSrc}} style={{width:30, height:30, borderRadius:15, marginRight: 5}} />
                    <Text style={{fontWeight:'600', color:'#111'}}>{this.props.name}</Text>
                </TouchableOpacity>
                <View style = {{width:25, height:25, margin:10}}/>
            </View>
        );
    }

    render() {
        if(this.props.type == "message"){
            return (
                <View>{this.message()}</View>
            );}
        else if (this.props.type == "profile"){
            return (
                <View>{this.profile()}</View>
            );
        }
        else if (this.props.type == "directMessage"){
            return(<View>{this.directMessage()}</View>);
        }
        else if (this.props.type == "welcome") {
            return (<View>{this.welcome()}</View>);
        }
        else if (this.props.type == "questionnaire"){
            return(<View>{this.questionnaire1()}</View>)
        }
        else {
            return (<View>{this.home()}</View>);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height:60,
        flexDirection:'row',
        paddingTop:10,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
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
    },
    qButton: {
        backgroundColor: '#15d5ec',
        width: 360,
        height: 60,
        marginTop: 40,
        justifyContent: 'flex-end'
    },
});
