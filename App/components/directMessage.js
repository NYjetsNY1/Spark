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

var image1 = require('../images/image1.jpeg');
var image2 = require('../images/image2.jpeg');


const Messages = [{
    "key": 7,
    "sender_name": "Diane",
    "sender_image": image1,
    "message": "Me too!"
}, {
    "key": 6,
    "sender_name": "Samuel",
    "sender_image": image2,
    "message": "what can I say- I love my produce"
}, {
    "key": 5,
    "sender_name": "Diane",
    "sender_image": image1,
    "message": "wow cool, so healthy"
}, {
    "key": 4,
    "sender_name": "Samuel",
    "sender_image": image2,
    "message": "Yesterday I went to the grocery store and bought apples. They were delicious."
}, {
    "key": 3,
    "sender_name": "Diane",
    "sender_image": image1,
    "message": "Not much, wbu"
}, {
    "key": 2,
    "sender_name": "Samuel",
    "sender_image": image2,
    "message": "Hi, what's up"
}, {
    "key": 1,
    "sender_name": "Diane",
    "sender_image": image1,
    "message": "Hey!"
}];

export default class DirectMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typing: "",
            messages: Messages,
            recipient_name: "Diane",
            recipient_image: image1
        }
    }

    renderItem({item}) {
        return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={item.sender_image}/>
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
                <Nav type="directMessage" image = {this.state.recipient_image} name={this.state.recipient_name} chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />
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
