import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Facebook from '../assets/images/facebook.svg'
import Instagram from '../assets/images/instagram.svg'
import TouchAbleButton from './TouchAbleButton'

export default function SocialLinks() {
  const handleFacebookPress = () => {
    console.log("Facebook Press");
  }
  const handleInstagramPress = () => {
    console.log("Instagram Press");
  }
  const data =[{id: 1, name: 'Facebook'}, {id: 2, name: 'Instagram'}];
  return (
    <View>
        <View style={styles.socialLinkContainer}>
              <TouchAbleButton item={<Facebook width={30} height={30} />} onPress={() => handleFacebookPress()} style={styles.buttonfacebook} />
              <TouchAbleButton item={<Instagram width={30} height={30} />} onPress={() => handleInstagramPress()} style={styles.buttonInstagram} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    socialLinkContainer:{
        flexDirection: 'row',
        gap: 40,
        alignItems:'center',
        marginVertical: 20,
    },
    buttonfacebook: {
     
    }
})