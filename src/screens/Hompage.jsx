import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Collections from '../components/Collections';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import HomeCarousel from '../components/HomeCarousel';
import NewArrival from '../components/NewArrival';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ShopByBrand from '../components/ShopByBrand';
import VideoPlayer from '../components/VideoPlayer';

export default function Hompage({ navigation }) {
  const collectionSortingRes = useSelector(
    state => state.adminData.adminData.collectionSortingRes,
  );

  const collectionSorting =
    collectionSortingRes?.collectionSorting &&
    JSON.parse(collectionSortingRes?.collectionSorting);

  const productGridRes = useSelector(
    state => state.adminData.adminData.productGridRes,
  );
  const productGridData = productGridRes?.productGridData
    ? JSON.parse(productGridRes?.productGridData)
    : null;

  const productGrid = id => {
    const data = productGridData?.find(e => e.id == id);
    return <FeaturedProducts gridData={data} home={true} nav={navigation} />;
  };
  const renderComponentByType = (type, id) => {
    switch (type) {
      case 'collections':
        return <Collections nav={navigation} />;
      case 'banner':
        return <HomeCarousel />;
      case 'new-arrival':
        return <NewArrival nav={navigation} />;
      case 'product-grid':
        return productGrid(id);
        case 'brand':
        return  <ShopByBrand/>;
      default:
        return null;
    }
  };

  const navigations = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigations.navigate('Search')}>
        <View style={styles.searchBtn}>
          <Image
            source={require('../assets/images/searchIcon.png')}
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholdertxt}>
            Search any Product..
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <ScrollView>
        <View style={styles.childContainer}>
          {collectionSorting?.filter(({ show }) => show)
            .map(({ type, id }) => (
            <View key={id}>{renderComponentByType(type, id)}</View>
          ))}
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childContainer: {
    marginHorizontal: 10,
  },
  collections: {
    zIndex: -9,
  },
  searchIcon:{
    width: 15,
    resizeMode: 'contain',
    marginRight: 15,
    marginLeft: 15,
  },
  searchPlaceholdertxt:{
    color: '#BBBBBB', 
    fontSize: 14
  },
  searchBtn: {
    width: '95%',
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 15
  },
});
