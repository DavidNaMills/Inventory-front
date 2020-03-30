jest.mock('react-redux');
import { useSelector } from 'react-redux';
import {adminConfig} from '../../configs/userConfigs/adminConfig';

const mockStaff = (token) => ({
    token: token,
    staff: {
        name: 'David',
        baseId: ['123', '456123']
    },
    config: adminConfig

});

const mockTypes = {
    locations: {
        '123': { displayValue: 'home' },
        '456123': { displayValue: 'home2' },
    },
    products: {
        'abc' : {displayValue: 'blue cups'},
        'def' : {displayValue:  'yellow cups'}
    }
}


beforeEach(()=>{
    useSelector.mockImplementation(() => ({
        staff: { ...mockStaff('123123123') },
        types: mockTypes
    }));
})

afterEach(()=>{
    jest.clearAllMocks();
});