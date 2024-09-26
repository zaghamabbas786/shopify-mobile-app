import axios from 'axios';
import axiosRetry from 'axios-retry';
import data from '../../enviroment'
const {StoreFrontAccessToken, AppUrl,StoreFrontUrl} = data
const apiRestClient = axios.create({
  baseURL: AppUrl,
  headers: {
    'Content-Type': 'application/json',
    // 'X-Shopify-Storefront-Access-Token': StoreFrontAccessToken,
    'store': StoreFrontUrl  },

});

axiosRetry(apiRestClient, {retries: 3})

export default apiRestClient;
