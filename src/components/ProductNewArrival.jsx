import { View, Text } from 'react-native'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import ProductListingComponent from './ProductListingComponent'
import apiClient from '../api/apiClient'
import apiRestClient from '../api/apiRestClient';

export default function ProductNewArrival({scrollViewRef}) {
    const [data, setData] = useState(null); 

    const getFeature = async () => {
      
      try {
        return await apiRestClient.get('api/featureMobile');
      } catch (error) {
        console.log('Error', error);
      }
    }

    const query = (handle) =>  { return `query MyQuery {
  collectionByHandle(handle: "${handle}") {
    products(first: 20) {
        edges {
          node {
            id
            title
            description
            tags
            totalInventory
            productType
            availableForSale
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
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
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
  }
}`;
    }

    const fetchData =  async () => {
    try {
      const res = await getFeature();
      const handle = res.data
      const q = query(handle);
      const response = await apiClient.post('', { query: q });
      setData(response.data.data.collectionByHandle.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  
    return  ( data &&  <ProductListingComponent
          title={""}
          description={""}
          data={data}
          scrollViewRef={scrollViewRef}
        />)
  
}