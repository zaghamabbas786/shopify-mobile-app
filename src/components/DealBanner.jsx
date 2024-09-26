import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Clock from '../assets/images/clock1.svg'
import TouchAbleButton from './TouchAbleButton'
import ArrowRight from '../assets/images/arrowRight.svg'
import { useScreenDimensions } from '../hooks/useScreenDimensions'


export default function DealBanner() {
    const dimensions = useScreenDimensions();
    const customStyling = styles(dimensions)
    const viewAllBtn = () => {
    return ( <View style={customStyling.btnView}>
            <Text style={customStyling.btnText}>View all</Text>
            <ArrowRight />
        </View>)
    }

  return (
    <View style={customStyling.container}>
       <View>
            <View style={customStyling.maintext}>
                <Text style={[customStyling.textHeading]}>Deal of the Day</Text>
            </View>
            <View style={[customStyling.maintext, {flexDirection:'row',gap:3}]}>
                <View style={customStyling.clockIcon}>
                    <Clock width={13} height={13}/>
                </View>
                <Text style={customStyling.textSubHeading}>22h 55m 20s remaining</Text>
            </View>
        
       </View>
       <TouchAbleButton item={viewAllBtn()} style={customStyling.viewAllBtnContainer} />
    </View>
  )
}

const styles = ({isPortrait}) => {return ( StyleSheet.create({
    container:{
        backgroundColor: '#D89471',
        height: 70,
        borderRadius: 12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        top: 20,
    },
    maintext: {
        height: 30,
        top: 8,
        left: 15,
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#FFFFFF',
    },
    textHeading: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#FFFFFF'
    },
    textSubHeading: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#FFFFFF'
    },
    clockIcon:{

    },
    viewAllBtnContainer:{
        borderWidth:1, 
        borderColor:'white', 
        width: 89,
        marginRight: isPortrait ? 20 : 100,
        height: 28, 
        justifyContent:'center',
        borderRadius: 4,
    },
    btnText: {
        color: 'white', 
        alignSelf: 'center', 
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        lineHeight: 16
    },
    btnView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 10, 
        alignItems: 'center'
    },
}))}