import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default function index (){

    const commonOptions: OptionsCommon = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
    };

    const cameraOptions: CameraOptions = {
        cameraType: 'front',
        saveToPhotos: true,
        ...commonOptions,
    }

    const onOpenCamera = async () => {
        const reponse: ImagePick 
    }
    return (
      <View>
        <Text>index</Text>
      </View>
    )
}