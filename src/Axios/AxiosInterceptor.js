import { useEffect } from 'react';
import axios from './axiosInstance';
import useDispatchHook from '../hooks/useDispatchHook/useDispatchHook';

const AxiosInterceptor = (props) => {
    const { createMessageDispatch } = useDispatchHook();


    const reqIntercept = axios.interceptors.request.use(req => {
        return req;
    });


    const resIntercept = axios.interceptors.response.use(res => {
        return res;
    }, error => {

        switch (error.response.status) {
            case 400:
                if (typeof (error.response.data.errors) === 'string') {
                    createMessageDispatch({ message: error.response.data.errors, messageType: 'errType' });
                } else {
                    createMessageDispatch({ message: 'something went wrong. Engineers are working on it', messageType: 'errType' });
                }
                break;

            case 401:
                createMessageDispatch({ message: 'unauthorized', messageType: 'errType' });
                break;

            case 500:
                if (typeof (error.response.data.errors) === 'string') {
                    createMessageDispatch({ message: error.response.data.errors, messageType: 'errType' });
                } else {
                    createMessageDispatch({ message: 'something went wrong. Engineers are working on it', messageType: 'errType' });
                }
                break;

            default:
                createMessageDispatch({ message: 'something went wrong. Engineers are working on it', messageType: 'errType' });
        }

        return Promise.reject(error);
    });


    useEffect(() => {
        return () => {
            axios.interceptors.response.eject(resIntercept);
            axios.interceptors.request.eject(reqIntercept);
        }
    }, [resIntercept])

    return (
        props.children
    )
};

export default AxiosInterceptor;