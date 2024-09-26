import { useEffect, useState } from 'react'
import ProductListingComponent from './ProductListingComponent'
import apiClient from '../api/apiClient'
import { PRODUCT_GRID } from '../Schema/querries';
export default function FeaturedProducts({ gridData, home = false, nav }) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.post('', {
        query: PRODUCT_GRID, variables: {
          handle: gridData.handle
        }
      });
      setData(response.data.data.collectionByHandle);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (data && <ProductListingComponent
    title={gridData.gridTitle}
    description={""}
    data={data}
    home={home}
    nav={nav}
    gridData={gridData}
  />)

}