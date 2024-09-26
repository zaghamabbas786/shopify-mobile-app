import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import TouchAbleButton from './TouchAbleButton'
import Calender from '../assets/images/calender.svg'
import ArrowRight from '../assets/images/arrowRight.svg'
import { useScreenDimensions } from '../hooks/useScreenDimensions'
import apiClient from '../api/apiClient'
import { TRENDING_PRODUCTS} from '../Schema/querries'


export default function TrendingBanner({nav}) {
    const dimensions = useScreenDimensions();
    const customStyling = styles(dimensions)
    const [data, setData] = useState(null);

    const fetchData =  async () => {
        try {
        const response = await apiClient.post('', { query: TRENDING_PRODUCTS });
        setData(response.data.data.collectionByHandle.products);
        } catch (error) {
        console.error('Error fetching products:', error);
        }
    };

    const viewAllBtn = () => {
    return ( <View style={customStyling.btnView}>
            <Text style={customStyling.btnText}>View all</Text>
            <ArrowRight />
        </View>)
    }

    useEffect(() => {
        fetchData();
        return (() => {setData(null)})
    }, []);

  return (
    <View style={customStyling.container}>
       <View>
            <View style={customStyling.maintext}>
                <Text style={[customStyling.textHeading]}>Trending Products</Text>
            </View>
            <View style={[customStyling.maintext, {flexDirection:'row',gap:3}]}>
                <View style={customStyling.clockIcon}>
                    <Calender width={13} height={13}/>
                </View>
                <Text style={customStyling.textSubHeading}>Last Date 29/02/22</Text>
            </View>
        
       </View>
       <TouchAbleButton item={viewAllBtn()} style={customStyling.viewAllBtnContainer}  onPress={()=> {nav.navigate('ProductListing', {products: data})}}/>
    </View>
  )
}

const styles = ({isPortrait}) => {return( StyleSheet.create({
    container:{
        backgroundColor: '#000000',
        height: 70,
        borderRadius: 12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // top: 10,
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
        borderRadius: 4
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