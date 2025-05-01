import axios from 'axios';

const customFetch = axios.create({
    baseURL : '/api/v1'      //because all requests start with this
});

export default customFetch;