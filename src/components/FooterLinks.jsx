import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function FooterLinks({item, title}) {
  return (
    <View>
      <Text style={styles.headingText}>{title}</Text>
      {
        item.map((e,index) => {
          return <View key={index} style={styles.links}>
                <Text style={styles.listLinks}>
                  {e}
                </Text>
            </View>
        }
          
        )
      }
      
      
      
    </View>
  )
}

const styles = StyleSheet.create({
    headingText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 18,
        marginVertical: 20,
        fontFamily: 'Montserrat'
    },
    listLinks:{
        color:"#FFFFFF"
    },
    links: {
        paddingVertical: 5 
    }
  });