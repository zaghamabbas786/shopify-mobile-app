import axios from 'axios';
import data from '../../enviroment';

const {store} = data;
export const totalProductCount = async handle => {
  try {
    const response = await axios.get(
      `https://${store}/collections/${handle}.json`,
    );
    const {products_count} = response.data.collection;
    return products_count;
  } catch (error) {
    console.error('error in totalProductCount', error);
  }
};
