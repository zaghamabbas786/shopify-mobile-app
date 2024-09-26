import React, {useRef} from 'react';
import withHeaderAndFooter from './withHeaderAndFooter';
import ProductPrice from '../components/ProductDetails/ProductPrice';
import { ScrollView, View, TouchableOpacity, Image } from 'react-native';
import SearchField from '../components/SearchField';
import {useNavigation} from '@react-navigation/native';


const ProductDetails = ({ route }) => {
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.goBack();
  };
  const { handle , id } = route.params; // Accessing the handle from route params
    
    return (
      <View style={styles.container}>
        <View style={styles.arrowHeader}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              style={styles.arrowIcon}
              source={require('../assets/images/backArrow.png')}
            />
          </TouchableOpacity>
        </View>

      <ScrollView ref={scrollViewRef}>
        <ProductPrice handle={handle}  id={id} scrollViewRef={scrollViewRef}/>
      </ScrollView>
      </View>
    );
  };
  
  const styles ={
    container:{
      backgroundColor: '#F9F9F9'
    },
    arrowHeader: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'red',
      height: 50,
    },
    arrowIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      marginLeft: 20
    },
  }
  export default ProductDetails;

// const ProductDetails = withHeaderAndFooter(ProductPrice);

// export default ProductDetails;
