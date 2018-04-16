/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Nav from './global-widgets/nav'
import firebase from '../config/firebase';

function remove(array, element) {
    return array.filter(e => e !== element);
}

export default class DirectMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            convoId: "",
            typing: "",
            messages: [],
            recipient_id: this.props.recipientId,
            recipient_name: "",
            recipient_image: '',
            userId: this.props.userData.userId,
            userName: "",
            userImage: "",
            userNewMatches: [],
            userConvos: [],
            recipientNewMatches: [],
            recipientConvos: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount(){

        if(this.props.convoId) this.state.convoId = this.props.convoId;
        console.log(this.state.convoId);

        if(this.props.convoId){
            let convoRef = firebase.database().ref(`conversations/${this.props.convoId}`);
            convoRef.on('value', conversation => {
                console.log(conversation.val());
                this.state.messages = conversation.val();
                this.setState(this.state);
            });
        }

        firebase.database().ref().child('users').on('value', users => {
            let allUserInfo = users.val();
            let loggedInUser = allUserInfo[this.state.userId];

            this.state.userName = loggedInUser.name;
            this.state.userImage = loggedInUser.profilePicUrl;
            //only set these values if they exist in db
            if(loggedInUser.newMatches) this.state.userNewMatches = loggedInUser.newMatches;
            if(loggedInUser.userConvos) this.state.userConvos = loggedInUser.userConvos;


            let recipientObj = allUserInfo[this.state.recipient_id];

            this.state.recipient_name = recipientObj.name;
            this.state.recipient_image = recipientObj.profilePicUrl;
            if(recipientObj.newMatches) this.state.recipientNewMatches = recipientObj.newMatches;
            if(recipientObj.userConvos) this.state.recipientConvos = recipientObj.userConvos;

            this.setState(this.state);

            firebase.database().ref().child('users').off();
        });

    }

    sendMessage(){
        console.log(this.state.typing);
        let message = {
            key: this.state.messages.length,
            message: this.state.typing,
            sender_name: this.state.userName,
            sender_image: this.state.userImage
        };
        this.state.messages.unshift(message);
        this.setState(this.state);

        let userRef = firebase.database().ref(`users/${this.state.userId}`);
        let recipientRef = firebase.database().ref(`users/${this.state.recipient_id}`);

        if(this.state.convoId == ''){
            //this is the first message ever sent, move the recipient user from newMatches to convos
            //also move logged in user from recipients newMatches to convos

            //create the conversation & save convoId
            let convoId = firebase.database().ref('conversations').push(this.state.messages);
            this.state.convoId = convoId.key;

            //for the user, remove recipient from new matches and add convo object to their userConvos

            //this.state.userNewMatches = remove(this.state.userNewMatches,this.state.recipient_id);

            console.log(this.state.userNewMatches);

            for (let key in this.state.userNewMatches){
                if(this.state.userNewMatches[key] == this.state.recipient_id){
                    delete this.state.userNewMatches[key];
                }
            }

            let convoObj = {
                convoId: this.state.convoId,
                lastMessage: this.state.typing,
                matchName: this.state.recipient_name,
                matchId: this.state.recipient_id,
                matchImage: this.state.recipient_image
            };
            this.state.userConvos.unshift(convoObj);

            /*
            userRef.update({
                userConvos: this.state.userConvos,
            });
            */


            userRef.update({
                userConvos: this.state.userConvos,
                newMatches: this.state.userNewMatches
            });



            //for the recipient, remove user from new matches and add convo object to their userConvos

            //this.state.recipientNewMatches = remove(this.state.recipientNewMatches, this.state.userId);
            for (let key in this.state.recipientNewMatches){
                if(this.state.recipientNewMatches[key] == this.state.userId){
                    delete this.state.recipientNewMatches[key];
                }
            }
            convoObj = {
                convoId: this.state.convoId,
                lastMessage: this.state.typing,
                matchName: this.state.userName,
                matchId: this.state.userId,
                matchImage: this.state.userImage
            };
            this.state.recipientConvos.unshift(convoObj);
            /*
            recipientRef.update({
                userConvos: this.state.recipientConvos
            });
            */

            recipientRef.update({
                userConvos: this.state.recipientConvos,
                newMatches: this.state.recipientNewMatches
            });

        } else {
            //this is a message sent in an existing convo
            let convoRef = firebase.database().ref(`conversations`);
            convoRef.update({
                [this.state.convoId]: this.state.messages
            });

            let userConvoIndex = this.getConvoIndex(this.state.userConvos, this.state.convoId);
            let recipientConvoIndex = this.getConvoIndex(this.state.recipientConvos, this.state.convoId);

            //update the convoObj at the correct indices for the user and recipient
            let convoObj = {
                convoId: this.state.convoId,
                lastMessage: this.state.typing,
                matchName: this.state.recipient_name,
                matchId: this.state.recipient_id,
                matchImage: this.state.recipient_image
            };
            this.state.userConvos[userConvoIndex] = convoObj;
            convoObj = {
                convoId: this.state.convoId,
                lastMessage: this.state.typing,
                matchName: this.state.userName,
                matchId: this.state.userId,
                matchImage: this.state.userImage
            };
            this.state.recipientConvos[recipientConvoIndex] = convoObj;

            //move convos to front of array for both user and recipient
            if(this.state.userConvos.length > 1){
                let tmp = this.state.userConvos[0];
                this.state.userConvos[0] = this.state.userConvos[userConvoIndex];
                this.state.userConvos[userConvoIndex] = tmp;
            }
            if(this.state.recipientConvos.length > 1){
                let tmp = this.state.recipientConvos[0];
                this.state.recipientConvos[0] = this.state.recipientConvos[recipientConvoIndex];
                this.state.recipientConvos[recipientConvoIndex] = tmp;
            }

            //update userConvos for user and recipient
            userRef.update({
                userConvos: this.state.userConvos
            });
            recipientRef.update({
                userConvos: this.state.recipientConvos
            });
        }

        this.state.typing = '';
        this.setState(this.state);
    }

    getConvoIndex(convoArray, convoId){
        for(let i = 0; i < convoArray.length; i++){
            let tmpConvo = convoArray[i];
            if(tmpConvo.convoId == convoId){
                return i;
            }
        }
        return -1;
    }



    renderItem({item}) {
        return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={{uri:item.sender_image}}/>
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.sender_name}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Nav type="directMessage" image = {this.state.recipient_image} name={this.state.recipient_name}
                     chat = {() => this.props.navigator.replace({id: "messages", userData: this.props.userData})}
                     toProfile = {() => this.props.navigator.replace({id:'profile', userData: {userId: this.state.recipient_id}})} />
                <FlatList
                    style={{transform: [{ scaleY: -1 }]}}
                    data={this.state.messages}
                    renderItem={this.renderItem}
                />
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.footer}>
                        <TextInput
                            value={this.state.typing}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Type something nice"
                            onChangeText={text => this.setState({ typing: text })}
                        />
                        <TouchableOpacity onPress={this.sendMessage}>
                            <Text style={styles.send}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    row: {
        transform: [{ scaleY: -1 }],
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10
    },
    rowText: {
        flex: 1
    },
    message: {
        fontSize: 18
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    input: {
        paddingHorizontal: 20,
        fontSize: 18,
        flex: 1
    },
    send: {
        alignSelf: 'center',
        color: 'lightseagreen',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20
    }
});
