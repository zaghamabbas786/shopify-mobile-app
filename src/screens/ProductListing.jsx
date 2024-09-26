import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SingleProductDesign from '../components/SingleProductDesign';
import Sort from '../assets/images/sort.svg';
import Filter from '../assets/images/filter.svg';
import TouchAbleButton from '../components/TouchAbleButton';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useFocusEffect} from '@react-navigation/native';
import apiClient from '../api/apiClient';
import {PRODUCT_GRID} from '../Schema/querries';
import {debounce} from '../helpers/debounce';
import { totalProductCount } from '../helpers/getTotoalProductCount';

export default function ProductListing(props) {
  const { title, handle } = props?.route?.params;
 
  const hasNext = props?.route?.params?.products.pageInfo.hasNextPage;
  const productListing =
    props?.route?.params?.node?.products?.edges ??
    props?.route?.params?.products?.edges ??
    props?.route?.params;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const {width, height} = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(width > height ? 4 : 2);
  const [isModalVisible, setModalVisible] = useState(false);
  const [optionData, setOptionData] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const prices = productListing.map(item =>
    parseFloat(item.node.variants.edges[0].node.priceV2.amount),
  );
  const [rangeLow, setRangeLow] = useState(null);
  const [rangeHigh, setRangeHigh] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);
  const sortOptions = [
    {label: 'Price:Low to High', value: 'lowToHigh'},
    {label: 'Price:High to Low', value: 'highToLow'},
    {label: 'Newest First', value: 'newest'},
    {label: 'Oldest First', value: 'oldest'},
  ];
  const dropdownRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const renderItem = React.useCallback(({item}) => {
    return (
      <View>
        <SingleProductDesign style={styles.productListing} data={item.node} />
      </View>
    );
  }, []);

  const sortbtn = () => {
    return (
      <TouchableOpacity onPress={() => toggleSortModal(true)}>
        <View style={styles.sortContainer}>
          <Text style={styles.sort}>Sort</Text>
          <View style={{marginRight: 0}}>
            <Sort height={16} width={16} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filterBtn = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filter}>Filter</Text>
        <View>
          <Filter height={16} width={16} />
        </View>
      </View>
    );
  };
  const clearAll = () => {
    return (
      <View style={styles.clearAll}>
        <Text style={styles.clearAllText}>Clear All</Text>
      </View>
    );
  };
  cleardata = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setRangeHigh(minMax('max'));
    setRangeLow(minMax('min'));
    setSelectedTags([]);
    debouncedProcessData();
  };
  const processData = () => {
    if (!Array.isArray(data) || data.length == 0) return;
    let filteredData = [...data];

    if (selectedColors.length > 0) {
      filteredData = filteredData.filter(item => {
        let matchColor = false;

        if (selectedColors.length > 0) {
          const productType = item.node.productType;
          if (productType) {
            matchColor = selectedColors.some(color => {
              return productType == color.toString();
            });
          }
        } else {
          matchColor = true;
        }
        return matchColor;
      });
    }
    if (selectedTags.length > 0) {
      filteredData = filteredData.filter(item => {
        return selectedTags.some(tag => item.node.tags.some(e => e == tag));
      });
    }

    if (rangeHigh && rangeLow) {
      filteredData = filteredData.filter(item => {
        const price = parseFloat(
          item.node.variants.edges[0].node.priceV2.amount,
        );
        return price >= rangeLow && price <= rangeHigh;
      });
    }

    if (sortOption) {
      filteredData.sort((a, b) => {
        const priceA = parseFloat(a.node.variants.edges[0].node.priceV2.amount);
        const priceB = parseFloat(b.node.variants.edges[0].node.priceV2.amount);
        const dateA = new Date(a.node.createdAt);
        const dateB = new Date(b.node.createdAt);

        switch (sortOption?.value) {
          case 'lowToHigh':
            return priceA - priceB;
          case 'highToLow':
            return priceB - priceA;
          case 'newest':
            return dateB - dateA;
          case 'oldest':
            return dateA - dateB;
          default:
            return 0;
        }
      });
    }
    setShowData(filteredData.length > 0 ? filteredData : 'Not Found');

    // setData(sortedData);
  };
  const debouncedProcessData = debounce(processData, 1500);
  useFocusEffect(
    React.useCallback(() => {
      setTotalCount(null)
      totalProductCount(handle).then(setTotalCount)
      debouncedProcessData();
      setRangeLow(Math.min(...prices));
      setRangeHigh(Math.max(...prices));
      setOptionData([]);
      setTags([]);
      setSelectedColors([]);
      setSelectedTags([]);
      setData([...productListing]);
      setShowData([]);
      setPage(1);
      setHasMore(hasNext);
      return () => {
        setData([]);
        setShowData([]);
        setPage(1);
      };
    }, [productListing]),
  );

  const toggleItem = id => {
    if (!productListing) return;

    if (selectedColors.includes(id.toString())) {
      setSelectedColors(
        selectedColors.filter(color => color !== id.toString()),
      );
    } else {
      setSelectedColors([...selectedColors, id.toString()]);
    }
  };

  const toggleTag = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onValuesChange = values => {
    setRangeLow(values[0]);
    setRangeHigh(values[1]);
  };

  const handleSortOptionPress = option => {
    setSortOption(option);
    debouncedProcessData();
    toggleSortModal(false);
  };

  const toggleSortModal = visible => {
    if (visible) {
      setSortModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: height / 2,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setSortModalVisible(false));
    }
  };

  const fetchOptionData = () => {
    try {
      if (!Array.isArray(data) || data.length == 0) return;
      const productType = [];
      const tagsSet = new Set();
      data?.forEach(product => {
        if (!productType[product.node.productType]) {
          productType[product.node.productType] = [];
        }
        productType[product.node.productType].push(product.node.productType);

        product?.node?.tags?.forEach(tag => {
          tagsSet.add(tag);
        });
      });

      setOptionData(productType);
      setTags([...tagsSet]);
    } catch (error) {
      console.error('Error creating fetchOptionData:', error);
    }
  };
  useEffect(() => {
    fetchOptionData();
    debouncedProcessData();
  }, [
    sortOption,
    selectedColors,
    selectedSizes,
    rangeLow,
    rangeHigh,
    productListing,
    selectedTags,
    data,
  ]);

  const minMax = val => {
    const tempArray = data.length > 0 ? data : productListing;
    var newprice = tempArray?.map(item =>
      parseFloat(item?.node?.variants?.edges[0].node.priceV2.amount),
    );
    if (val == 'max') {
      return Math.max(...newprice);
    } else {
      return Math.min(...newprice);
    }
  };
  useEffect(() => {
    const newNumColumns = width > height ? 4 : 2;
    setNumColumns(newNumColumns);
  }, [width, height, productListing]);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async page => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0 || isModalVisible)
        return;

      setLoading(true);
      const response = await apiClient.post('', {
        query: PRODUCT_GRID,
        variables: {
          handle,
          after: page > 1 ? data[data.length - 1]?.cursor : null,
        },
      });

      const products = response?.data?.data?.collectionByHandle.products.edges;
      if (products.length > 0) {
        const hasId = new Set(data.map(e => e.node.id));
        const newProducts = products.filter(e => !hasId.has(e.node.id));
        const updatedData = [...data, ...newProducts];

        setData(updatedData);

        const prices = updatedData.map(item =>
          parseFloat(item.node.variants.edges[0].node.priceV2.amount),
        );

        setRangeLow(Math.min(...prices));
        setRangeHigh(Math.max(...prices));
      }
      setHasMore(
        response?.data?.data?.collectionByHandle.products.pageInfo.hasNextPage,
      );
    } catch (error) {
      console.error('Error fetching load more products:', error);
    }
  };
  const handleContentSizeChange = () => {
    if (loading) {
      setLoading(false);
    }
  };
  const loadMoreProducts = React.useCallback(() => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  const keyExtractor = React.useCallback(item => item?.node?.id, []);

  if (productListing.length == 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          No products available
        </Text>
      </View>
    );
  }
  if ((Array.isArray(showData) && showData.length == 0) || data.length == 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.productListing}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemLength}>
          {title} ({(totalCount ?? data?.length )+ ' items'})
        </Text>
      </View>
      <View style={styles.sortAndFilterContainer}>
        <TouchAbleButton item={sortbtn()} />
        <TouchAbleButton
          item={filterBtn()}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <View style={styles.ntfound}>
        {showData && typeof showData !== 'string' ? (
          <View>
            <FlatList
              data={showData}
              key={numColumns}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              numColumns={numColumns}
              onEndReached={loadMoreProducts}
              onEndReachedThreshold={0.5}
              onContentSizeChange={handleContentSizeChange}
            />
            {loading && (
              <View style={styles.loadermore}>
                <ActivityIndicator size={20} color="#0000ff" />
              </View>
            )}
          </View>
        ) : (
          <View
            style={styles.notFoundMain}>
            <Text style={styles.notFoundTxt}>
              Not Found
            </Text>
          </View>
        )}
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <ScrollView style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.xTxt}>x</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.filterHeading}>Product Type</Text>
            {Object.entries(optionData).filter(([name])=> name.length).map(([name, values]) => {
              const uniqueValues = [...new Set(values)];

              return (
                <View
                  key={`${name}-${uniqueValues}`}
                  style={styles.checkboxView}>
                  <Text style={styles.label}>{uniqueValues}</Text>
                  <CheckBox
                    value={uniqueValues.some(e => selectedColors.includes(e))}
                    onValueChange={() => toggleItem(uniqueValues)}
                    tintColors={{true: 'green', false: '#BBB5B5'}}
                  />
                </View>
              );
            })}
            <View style={styles.horizontalRule}></View>
          </View>

          <View>
            <Text style={styles.filterHeading}>Tags</Text>
            {tags?.map(tag => (
              <View style={styles.checkboxView} key={tag}>
                <Text style={styles.label}>{tag}</Text>
                <CheckBox
                  value={selectedTags.includes(tag)}
                  onValueChange={() => toggleTag(tag)}
                  tintColors={{true: 'green', false: '#BBB5B5'}}
                />
              </View>
            ))}
            <View style={styles.horizontalRule}></View>
          </View>

          <View style={styles.priceView}>
            <Text style={styles.filterHeading}>Price</Text>
            <View style={styles.mainPriceView}>
              <Text style={styles.minPrice}>PKR{rangeLow} </Text>
              <Text style={styles.maxPrice}>PKR{rangeHigh}</Text>
            </View>
            <View style={styles.sliders}>
              {rangeLow && rangeHigh && (
                <MultiSlider
                  values={[rangeLow, rangeHigh]}
                  sliderLength={280}
                  onValuesChange={values => onValuesChange(values)}
                  min={minMax('min')}
                  max={minMax('max')}
                  step={1}
                  allowOverlap={false}
                  snapped
                  selectedStyle={{
                    backgroundColor: '#D89471',
                  }}
                  unselectedStyle={{
                    backgroundColor: '#D9D9D9',
                  }}
                  containerStyle={{
                    height: 40,
                  }}
                  trackStyle={{
                    height: 2,
                  }}
                  markerStyle={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: '#D89471',
                    borderColor: 'white',
                    borderWidth: 2,
                  }}
                  pressedMarkerStyle={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: '#D89471',
                    borderColor: 'white',
                    borderWidth: 3,
                  }}
                />
              )}
            </View>
          </View>
          <TouchAbleButton item={clearAll()} onPress={cleardata} />
        </ScrollView>
      </Modal>

      <Modal
        visible={isSortModalVisible}
        transparent={true}
        onRequestClose={() => toggleSortModal(false)}>
        {/* <TouchableOpacity
          style={styles.sortModalOverlay}
          onPress={() => toggleSortModal(false)}
        /> */}
        <Animated.View style={[styles.sortModalContainer, {top: slideAnim}]}>
          <TouchableOpacity
            style={styles.closeButtonSort}
            onPress={() => toggleSortModal(false)}>
            <View></View>
            <Text style={styles.closeButtonText}>Sort</Text>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <View style={styles.sortOptionsContainer}>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.sortOptionButton}
                onPress={() => handleSortOptionPress(option)}>
                {sortOption?.value === option.value && (
                  <View style={styles.greenDot} />
                )}
                <Text style={styles.sortOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  productListing: {
    flex: 1,
    padding: '3%',
  },
  itemLength: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
  },
  sort: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 16,
  },
  filter: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: 12,
    lineHeight: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  sortAndFilterContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 80,
    justifyContent: 'space-around',
    borderRadius: 2,
    height: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 80,
    height: 30,
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 2,
    gap: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    left: 350,
  },
  filterHeading: {
    padding: 10,
    left: 15,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21,
    color: '#777777',
  },
  label: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    color: '#777777',
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  priceView: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 50
  },
  sliders: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearAll: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '40%',
  },
  clearAllText: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 21,
    color: '#000000',
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderColor: '#BBB5B5',
    marginVertical: 20,
    marginHorizontal: 30,
  },
  minPrice: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    color: '#777777',
  },
  maxPrice: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    color: '#777777',
  },
  mainPriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '10%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  sortOption: {
    paddingVertical: 10,
  },
  dropdownButton: {
    width: 80,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  dropdownButtonText: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#FFF',
    width: '47%',
  },
  dropdownRow: {
    backgroundColor: '#FFF',
    borderBottomColor: '#C5C5C5',
    height: 40,
  },
  dropdownRowText: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16,
  },
  closeButtonSort: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: '3%',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 24,
  },
  sortOptionsContainer: {
    padding: '5%',
  },
  sortOptionButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortOptionText: {
    fontSize: 18,
    color: '#333',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 10,
  },
  sortModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadermore: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  notFoundMain:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  notFoundTxt:{
    fontWeight: 'bold', 
    fontSize: 20, 
    color: 'black'
  },
  ntfound: {
    flex: 1, 
    alignItems: 'flex-start'
  },
  xTxt: {
    color: 'black', 
    fontSize: 24
  },
});
