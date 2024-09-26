import { View, Text, Image } from 'react-native'
import React from 'react'


export default function Splash({ navigation }) {


    setTimeout(() => {

        navigation.replace("Test2")
    }, 2000)

    return (
        <View>
            <Image
                style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover'
                }}
                source={require('./ecomerce.png')}
            />
        </View>
    )
}