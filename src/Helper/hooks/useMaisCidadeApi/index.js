import  axios from 'axios';
import { BASE_URL_API } from '../../Contants';


export const useMaisCidadeApi = axios.create({ baseURL: BASE_URL_API })