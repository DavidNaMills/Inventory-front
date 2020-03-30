import {renderHook, act} from '@testing-library/react-hooks';
import usePopup from '../../hooks/usePopup/usePopup';


const defaultState = {
    show: false,
    selected: null
};

describe('usePopup hook test suite', ()=>{
    it('sets the popup to open', ()=>{
        const {result} = renderHook(()=>usePopup());
        expect(result.current.isOpen).toEqual(defaultState);
        act(()=>{
            result.current.openPopup();
        });
        expect(result.current.isOpen).toEqual({
            show: true,
            selected: null
        });
    });
    
    it('sets the popup to open with selected data set', ()=>{
        const tempSelected = '123456789';
        const {result} = renderHook(()=>usePopup());
        expect(result.current.isOpen).toEqual(defaultState);
        act(()=>{
            result.current.openPopup(tempSelected );
        });
        expect(result.current.isOpen).toEqual({
            show: true,
            selected: tempSelected 
        });
    });

    it('sets the popup to closed', ()=>{
        const {result} = renderHook(()=>usePopup());
        expect(result.current.isOpen).toEqual(defaultState);
        act(()=>{
            result.current.closePopup();
        });
        expect(result.current.isOpen).toEqual({
            show: false,
            selected: null
        });
    });
});