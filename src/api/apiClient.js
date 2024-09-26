import axios from 'axios';
import data from '../../enviroment'
const {StoreFrontAccessToken, AppUrl,StoreFrontUrl} = data
const apiClient = axios.create({
  baseURL: StoreFrontUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': StoreFrontAccessToken,  },

});

export default apiClient;
