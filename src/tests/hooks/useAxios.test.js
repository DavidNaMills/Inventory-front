import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../Axios/axiosInstance';
import useAxios from '../../hooks/useAxios/useAxios';

const mockAxios = new MockAdapter(axios);
const defaultState = {
    isLoading: false,
    errors: null,
    data: null,
    id: null
}


describe('useAxios test suite', () => {

    // test fails in development because using setTimeout for 3s to simulate delay from backend for spinner testing
    it('sets the isLoading, errors, and data state when fetch is successfull. also calls callback', async () => {
        mockAxios.onGet('/hello').reply(200, {
            items: {
                hello: 'goodbye'
            }
        });

        const callBack = jest.fn();
        const callConfig = {
            url: '/hello',
            method: 'GET',
            callBack
        }

        const { result } = renderHook(() => useAxios(axios));
        expect(result.current.fetchState).toEqual(defaultState);
        await act(async () => {
            await result.current.makeCall(callConfig);
        });
        await act(async () => {
            
            await expect(result.current.fetchState).toEqual({
                isLoading: false,
                errors: null,
                id: null,
                data: {
                    items: {
                        hello: 'goodbye'
                    }
                }
            });
        });
        expect(callBack).toHaveBeenCalledTimes(1);
        expect(callBack).toHaveBeenCalledWith({
            items: {
                hello: 'goodbye'
            }
        });
    });

    it('sets the isLoading, and errors state when fetch fails. calls callback ', async() => { 
        mockAxios.onGet('/hello').reply(500, {
            msg: 'sth went wrong'
        });

        const callBack = jest.fn();
        const callConfig = {
            url: '/hello',
            method: 'GET',
            callBack
        }

        const { result } = renderHook(() => useAxios(axios));
        expect(result.current.fetchState).toEqual(defaultState);
        await act(async () => {
            await result.current.makeCall(callConfig);
        });

        expect(result.current.fetchState).toEqual({
            data: null, 
            errors: null,
            isLoading: false,
            id: null
        });
        expect(callBack).toHaveBeenCalledTimes(1);
        expect(callBack).toHaveBeenCalledWith({
            id: null,
            error: true,
            message: 'went wrong',
            data: null
        });
    });
});