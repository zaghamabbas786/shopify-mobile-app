import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MobileIcon from '../assets/images/mobileIcon.svg';
import LocationIcon from '../assets/images/locationPin.svg';

export default function ContactUs() {
  return (
    <View>
            <Text style={styles.contactHeading}>Contact Us</Text>
            <Text style={styles.contactDescription}>Available between 8AM to 8PM. Ready to answer your questions.</Text>
            <View style={styles.contactContainer}>
                <MobileIcon width={30} height={18}/>
                <Text style={styles.contactText}>+1 234 567 8</Text>
            </View>
            <View style={styles.locationContainer}>
                <LocationIcon width={30} height={18}/>
                <Text style={styles.locationText}>4800 San Matoo Ln NE</Text>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contactHeading:{
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: '700',
    },
    contactDescription:{
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 20
    },
    contactContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    locationContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginVertical: 10
    },
    contactText:{
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '400',
    },
    locationText:{
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '400',
    }
})