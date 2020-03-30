import React from 'react';
import '../testHelpers/context';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

jest.mock('react-redux');
import { useSelector } from 'react-redux';

jest.mock('../../hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';

import LocationChanger from '../../Components/LocationChanger/LocationChanger';
import PlaceIcon from '@material-ui/icons/Place';


const mockStaff = {
    token: 'fdsfdfdfdsfsa',
    staff: {
        name: 'David',
        baseId: ['123', '456123']
    }
};

const mockStaffSingle = {
    token: 'fdsfdfdfdsfsa',
    staff: {
        name: 'David',
        baseId: ['123']
    }
};

const mockLocations = {
    locations: {
        '456123': { displayValue: 'home2' },
        '123': { displayValue: 'home' }
    }
}


afterEach(() => {
    jest.clearAllMocks();
})

const mockDispatch = jest.fn();
beforeEach(()=>{
    useDispatchHook.mockImplementation(()=>({
        changeCurrentLocationDispatch: mockDispatch
    }));
})

describe('<LocationChanger /> test suite', () => {
    describe('basic tests', () => {
        beforeEach(() => {
            useSelector.mockImplementation(() => ({
                staff: mockStaff,
                types: mockLocations
            }))
        });

        it('matches snapshot', () => {
            const comp = renderer.create(<LocationChanger />);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', () => {
            const wrapper = mount(<LocationChanger />);
            expect(wrapper.exists).toBeTruthy();
        });
    });

    describe('Locations are greater than 1 and staff.token present', () => {
        let wrapper;

        beforeEach(()=>{
            useSelector.mockImplementation(() => ({
                staff: mockStaff,
                types: mockLocations
            }));
            wrapper = mount(<LocationChanger />);
        });

        it('renders a <div> with className="locationChanger" a <span/> with className="locationChanger__bold" and <PlaceIcon/>', () => { 
            const div = wrapper.find('div');
            const span = wrapper.find('span');
            expect(div.length).toBe(1);
            expect(wrapper.find(PlaceIcon).length).toBe(1);
            expect(span.exists).toBeTruthy();
            expect(span.props()).toHaveProperty('className', 'locationChanger__bold');
            expect(div.props()).toHaveProperty('className', 'locationChanger');
        });
        
        it('renders a <select/> element if staff.baseId[] length is greater than 1', () => { 
            const select = wrapper.find('select');
            expect(select.length).toBe(1);
            expect(select.props().children.length).toBe(2);
            expect(select.props()).toHaveProperty('className', 'locationChanger__selectStyle');
        });
        
        it('fires the changeCurrentLocationDispatch method on select change', () => { 
            wrapper.find('select').simulate('change');
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith('123');
        });
    });

    it('renders the location name if staff.baseId[] length is only 1 ', () => { 
        useSelector.mockImplementation(() => ({
            staff: mockStaffSingle,
            types: mockLocations
        }));
        const wrapper = shallow(<LocationChanger />);
        expect(wrapper.find('.locationChanger__selectStyle').length).toBe(0);
        expect(wrapper.find('p').length).toBe(1);
    });

    it('returns null if no staff.token present but types.locations are present', () => {
        useSelector.mockImplementation(() => ({
            staff: {token: null},
            types: mockLocations
        }));
        const wrapper = shallow(<LocationChanger />);
        expect(wrapper.find('.locationChanger__selectStyle').length).toBe(0);
        expect(wrapper.find('p').length).toBe(0);
     });

     it('returns null if types.locations length is 0 and staff.token exists', () => {
        useSelector.mockImplementation(() => ({
            staff: {token: 'fsdfda'},
            types: {locations: {}}
        }));
        const wrapper = shallow(<LocationChanger />);
        expect(wrapper.find('.locationChanger__selectStyle').length).toBe(0);
        expect(wrapper.find('p').length).toBe(0);
     });
});