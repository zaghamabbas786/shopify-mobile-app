import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'



export default function Sponsored() {
  return (
    <View style={styles.container}>
        <Text style={styles.sponsorText}>Sponsored</Text>
        <View>
            <ImageBackground
                source={require('../assets/images/sponsor.png')}
                style={styles.imageBackground}
            >
                <View style={styles.sponsMain}>
                    <Text style={styles.sponsorUPTO}>up to <Text style={styles.sponsorOff}>50% Off</Text></Text>
                </View>
            </ImageBackground>
        </View>
        <View style={styles.mainView}>
            <View>
                <View style={styles.maintext}>
                    <Text style={[styles.textHeading]}>up to 50% off</Text>
                </View>
            </View>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height:410,
        // bottom: 40,
        backgroundColor: '#FFFFFF',
        marginBottom: 20
    },
    imageBackground: {
        width: '100%',
        height: 320,
        alignItems: 'center',
        borderRadius: 220
    },
    sponsMain: {
        width: 130, 
        marginTop: 10
    },
    sponsorText: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 22,
        marginVertical: 10,
        left: 15,
        color: '#000000'
    },
    sponsorUPTO: {
        fontSize: 32, 
        fontFamily: 'Montserrat', 
        lineHeight: 40, 
        textAlign: 'center', 
        fontWeight: '400', 
        color: 'white'
    },
    sponsorOff: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32},
    mainView: {
        flexDirection: 'row',
        justifyContent:'space-between', 
        alignItems:'center',
    },
    image: {
        width: '100%',
        height:204,
        borderRadius: 6
    },
    maintext: {
        height: 30,
        top: 8,
        left: 15,
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#000000',
    },
    textHeading: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        fontWeight: '400',
        // letterSpacing: 0,
        // textAlign: 'left',
        color: '#000000'
    },
    viewAllBtnContainer:{
        borderWidth:1, 
        borderColor:'black', 
        width: 120,
        marginRight: 20,
        height: 35, 
        justifyContent:'center',
        borderRadius: 4,
        backgroundColor: '#000000'
    },
    btnText: {
        color: 'white', 
        alignSelf: 'center', 
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: 16,
    }
})