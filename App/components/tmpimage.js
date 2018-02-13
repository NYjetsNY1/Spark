import React from 'react'
import firebase from '../config/firebase'
import { ImageFromStorage } from 'react-firebase-storage-connector';


let Props = {
    username: 'tmpImage', // The username, will be used as alt prop
    imageName: 'image11.jpeg' // The name of the image that is used to obtain a download url from the storage
};

const ProfilePicture = () => (
    <ImageFromStorage
        storageRef={'image11.jpeg' && firebase.storage().ref('images').child('image11.jpeg')}
    />
);

// Export the connected component
export default ProfilePicture;



