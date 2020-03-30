import {renderHook, act} from '@testing-library/react-hooks';
import useTableDisplay from '../../hooks/useTableDisplay/useTableDisplay';

const tempTestData = [
    {_id: '123', name: 'dogs', qty: 123},
    {_id: '1345', name: 'cats', qty: 17},
    {_id: '1321', name: 'hamsters', qty: 0},
    {_id: '875', name: 'fish', qty: 2},
];

const newItem = {_id: '191817', name: 'aligators', qty: 99};

describe('useTableDisplay test suite', ()=>{
    it('initialises the toDisplayList state', ()=>{
        const {result} = renderHook(()=>useTableDisplay());
        expect(result.current.toDisplayList.length).toBe(0);
        act(()=>{
            result.current.init(tempTestData);
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length);
    });


    it('adds and item to the list using addItem', ()=>{
        const {result} = renderHook(()=>useTableDisplay());
        expect(result.current.toDisplayList.length).toBe(0);
        act(()=>{
            result.current.init(tempTestData);
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length);
        act(()=>{
            result.current.addItem(newItem);
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length+1);
        expect(result.current.toDisplayList[tempTestData.length]).toEqual(newItem);
        
    });

    it('updates item in the list using updateItem', ()=>{
        const updateName = {_id: '1321', name: 'really big snake', qty: 0};
        const {result} = renderHook(()=>useTableDisplay());
        expect(result.current.toDisplayList.length).toBe(0);
        act(()=>{
            result.current.init(tempTestData);
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length);
        act(()=>{
            result.current.updateItem(updateName, '1321');
        });
        expect(result.current.toDisplayList[2]).toEqual(updateName);
    });

    it('removes item in the list using removeItem', ()=>{
        const {result} = renderHook(()=>useTableDisplay());
        expect(result.current.toDisplayList.length).toBe(0);
        act(()=>{
            result.current.init(tempTestData);
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length);
        act(()=>{
            result.current.removeItem('1321');
        });
        expect(result.current.toDisplayList.length).toBe(tempTestData.length-1);
        expect(result.current.toDisplayList[2]).toEqual(tempTestData[3]);
    });
});