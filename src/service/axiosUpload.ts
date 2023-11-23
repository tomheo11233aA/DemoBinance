import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import contants from '@util/contants';

const axiosUpload = axios.create({
  baseURL: contants.HOSTING,
  timeout: 10000,
  validateStatus: (status) => {
    return status == 200 || status == 400;
  },
});
axiosUpload.interceptors.request.use(
  async config => {
    const token: string = await AsyncStorage.getItem(contants.TOKEN) || '';
    config.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
    return config;
  },
  err => Promise.reject(err),
);
axiosUpload.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
); // callback
export default axiosUpload;
