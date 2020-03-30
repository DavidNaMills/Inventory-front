import axios from 'axios';
import {BASE} from './urls';


const base = axios.create({
    baseURL: BASE
});

export default base;