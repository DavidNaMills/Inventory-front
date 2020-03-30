import {useState} from 'react';

const defaultState = {
    isLoading: false,
    errors: null,
    data: null,
    id: null
}

const useAxios = (axios) =>{
    const [fetchState, setFetchState] = useState(defaultState);

    const makeCall = ({url, method, data, callBack=()=>{}, newId=null}) =>{
        const fullConfig = {
            url,
            method
        };
        if(data){
            fullConfig.data = data
        }
        setFetchState({...defaultState, isLoading: true, id: newId})

        return axios(fullConfig)
        .then(res=>{
            // setTimeout(()=>{
                const result = {
                    id: newId,
                    isLoading: false,
                    errors: null,
                    data: res.data
                }

                setFetchState(result)
                callBack(res.data);
                return result;
            // }, 3000);
        })
        .catch(err=>{
            setFetchState({...defaultState, id: newId});
            callBack({
                id: newId,
                error: true,
                message: 'went wrong',
                data: null
            });
        })
    }

    return {
        fetchState,
        makeCall
    }
}

export default useAxios;