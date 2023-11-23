import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import contants from '@util/contants';

const axiosDomain2 = axios.create({
  baseURL: contants.HOSTING_CHART,
  timeout: 10000,
  validateStatus: (status) => {
    return status == 200 || status == 400;
  },
});
axiosDomain2.interceptors.request.use(
  async config => {
    const token: string = await AsyncStorage.getItem(contants.TOKEN) || '';
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  err => Promise.reject(err),
);
axiosDomain2.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
); // callback
export default axiosDomain2;
