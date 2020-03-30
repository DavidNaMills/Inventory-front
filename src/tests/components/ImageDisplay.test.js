import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ImageDisplay from '../../Components/ImageDisplay/ImageDisplay';

const tempUrl = 'https://www.fillmurray.com/200/300';

describe('<ImageDisplay/> test suite', () => {
    it('matches snapshot', () => {
        const comp = renderer.create(<ImageDisplay url={tempUrl} alt='fill murray' />);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    const wrapper = shallow(<ImageDisplay url={tempUrl} alt='fill murray' />);

    it('exists', () => {
        expect(wrapper.exists).toBeTruthy();
    });

    it('renders an <img/> tag with classname ="imageDisplay__medium"', () => {
        const img = wrapper.find('img');
        expect(img.length).toBe(1);
        expect(img.props().src).toEqual(tempUrl);
        expect(img.props().alt).toEqual('fill murray');
        expect(img.props().className).toEqual('imageDisplay imageDisplay__medium');
    });

    [
        { msg: 'sets the classname to "imageDisplay imageDisplay__small"', size: 'small', expected: 'small' },
        { msg: 'sets the classname to "imageDisplay imageDisplay__medium"', size: 'medium', expected: 'medium' },
        { msg: 'sets the classname to "imageDisplay imageDisplay__large"', size: 'large', expected: 'large' },
        { msg: 'sets the classname to "imageDisplay imageDisplay__desktop"', size: 'desktop', expected: 'desktop' },
        { msg: 'sets the classname to "imageDisplay imageDisplay__desktop"', size: 'hello', expected: 'medium' }
    ].forEach(x => {
        it(x.msg, () => {
            const sizeWrap = shallow(<ImageDisplay url={tempUrl} alt='fill murray' size={x.size} />);
            const img = sizeWrap.find('img');
            expect(img.length).toBe(1);
            expect(img.props().src).toEqual(tempUrl);
            expect(img.props().alt).toEqual('fill murray');
            expect(img.props().className).toEqual(`imageDisplay imageDisplay__${x.expected}`);
        });;
    })

    it('adds the "imageDisplay__blur" classname', () => {
        const sizeWrap = shallow(<ImageDisplay url={tempUrl} alt='fill murray' size={'large'} blur />);
        const img = sizeWrap.find('img');
        expect(img.length).toBe(1);
        expect(img.props().src).toEqual(tempUrl);
        expect(img.props().alt).toEqual('fill murray');
        expect(img.props().className).toEqual(`imageDisplay imageDisplay__large imageDisplay__blur`);
    });

    it('display an image as default', () => {
        const sizeWrap = shallow(<ImageDisplay alt='fill murray' size={'large'} blur />);
        const img = sizeWrap.find('img');
        expect(img.length).toBe(1);
        expect(img.props().src).toBe('noImage.jpg');
    });
    
    it('doesnt display a placeholder image when dispNoImage = false', () => {
        const sizeWrap = shallow(<ImageDisplay alt='fill murray' size={'large'} blur dispNoImage={false}/>);
        const img = sizeWrap.find('img');
        expect(img.length).toBe(1);
        expect(img.props().src).toBe(null);
    });

    it('displays a placeholder image if no url and dispNoImage is true. also adds a blank alt property', () => {
        const sizeWrap = shallow(<ImageDisplay size={'large'} dispNoImage/>);
        const img = sizeWrap.find('img');
        expect(img.length).toBe(1);
        expect(img.props().src).toBe('noImage.jpg');
        expect(img.props().alt).toBe('');
    });
});