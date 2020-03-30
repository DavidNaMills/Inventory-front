import {renderHook, act} from '@testing-library/react-hooks';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

const mockDispatch = jest.fn();
jest.mock('react-redux', ()=>({
    useDispatch: jest.fn(()=>mockDispatch)
}));
import {useDispatch} from 'react-redux';

jest.mock('../../store/userStore/userActions', ()=>({
    userLogin: jest.fn(),
    userLogout: jest.fn(),
    changeCurrentLocation: jest.fn(),
}))
import usr from '../../store/userStore/userActions';


jest.mock('../../store/typesStore/typesStoreActions', ()=>({
    startInitTypes: jest.fn(),
    addNewProductType: jest.fn(),
    addNewLocation: jest.fn(),
    removeLocationType: jest.fn(),
}))
import typs from '../../store/typesStore/typesStoreActions';

jest.mock('../../store/messagingStore/messagingActions', ()=>({
    createMessage: jest.fn()
}));
import msgTyp from '../../store/messagingStore/messagingActions';


afterEach(()=>{
    jest.clearAllMocks();
});


// TODO: check what the dispatch functions are being called with

describe('useDispatchHook test suite', ()=>{
    describe('user dispatch options', ()=>{
        it('calls dispatch and userLogin when userLoginDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.userLoginDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(usr.userLogin).toHaveBeenCalledTimes(1)
        });

        it('calls dispatch and userLogout when userLogoutDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.userLogoutDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(usr.userLogout).toHaveBeenCalledTimes(1)
        });

        it('calls dispatch and changeCurrentLocation when changeCurrentLocationDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.changeCurrentLocationDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(usr.changeCurrentLocation).toHaveBeenCalledTimes(1)
        });
    });

    describe('product action dispatches', ()=>{
        it('calls dispatch and startInitTypes when initTypesDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.initTypesDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(typs.startInitTypes).toHaveBeenCalledTimes(1)
        });

        it('calls dispatch and addNewProductType when addNewProductDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.addNewProductDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(typs.addNewProductType).toHaveBeenCalledTimes(1)
        });

        it('calls dispatch and addNewLocation when addNewLocationDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.addNewLocationDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(typs.addNewLocation).toHaveBeenCalledTimes(1)
        });

        it('calls dispatch and removeLocationType when removeLocationDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.removeLocationDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(typs.removeLocationType).toHaveBeenCalledTimes(1)
        });
    });

    describe('message action dispatches', ()=>{
        it('calls dispatch and createMessage when createMessageDispatch() is called', ()=>{
            const {result} = renderHook(()=>useDispatchHook());
            act(()=>{result.current.createMessageDispatch()});
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(msgTyp.createMessage).toHaveBeenCalledTimes(1)
        });
    });
});