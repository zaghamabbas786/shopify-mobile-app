import React, {useEffect, useRef} from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setFocus} from '../redux/slices/SearchFocusSlice';
import apiClient from '../api/apiClient';

const SearchField = ({searchQuery, setSearchQuery, setSuggestions}) => {
  const focuse = useRef(null);
  const dispatch = useDispatch();
  const search = useSelector(state => state.search.focus);

  const handleBlur = () => {
    dispatch(setFocus(false));
  };

  useEffect(() => {
    try {
      if (search) {
        focuse.current.focus();
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [search]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const {
          data: {data},
        } = await apiClient.post('', {
          query: `query MyQuery {
            search(query: "${searchQuery}", first: 5) {
              edges {
                node {
                  ... on Product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          src
                        }
                      }
                    }
                    variants(first: 5) {
                      edges {
                        node {
                          priceV2 {
                            amount
                            currencyCode
                          }
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                    collections(first: 20) {
                      edges {
                        node {
                          title
                          handle
                          image {
                            src
                          }
                          products(first: 20) {
                            pageInfo {
                              hasNextPage
                            }
                            edges {
                              cursor
                              node {
                                description
                                id
                                title
                                productType
                                images(first: 10) {
                                  edges {
                                    node {
                                      src
                                    }
                                  }
                                }
                                variants(first: 100) {
                                  edges {
                                    node {
                                      image {
                                        src
                                      }
                                      id
                                      compareAtPriceV2 {
                                        amount
                                        currencyCode
                                      }
                                      priceV2 {
                                        amount
                                        currencyCode
                                      }
                                      availableForSale
                                    }
                                  }
                                }
                                handle
                                options {
                                  id
                                  name
                                  values
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
        });

        const search = data.search;
        setSuggestions(search.edges);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (searchQuery?.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={require('../assets/images/searchIcon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          ref={focuse}
          onBlur={handleBlur}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder="Search any Product.."
          placeholderTextColor="#BBBBBB"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    zIndex: 999999,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 0,
    width: '100%',
  },
  searchIcon: {
    width: 15,
    resizeMode: 'contain',
    marginRight: 5,
    marginLeft: 10,
  },
  searchInput: {
    color: '#000',
    flex: 1,
  },
});

export default SearchField;
