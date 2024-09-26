import axios from 'axios';
import data from '../../enviroment';

const {store} = data;
export const getRecomendation = async id => {
  try {
    const productId = id.match(/\d+/)[0];
    const response = await axios.get(
      `https://${store}/recommendations/products.json?product_id=${productId}&limit=4&intent=related`,
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
