import buildFormData from '../../helpers/buildFormData/buildFormData';

const mockAppend = jest.fn();

// const orig = global.FormData;
// global.FormData = () => ({ append });

afterEach(()=>{
    jest.clearAllMocks();
});

// afterAll(()=>{
//     global.FormData = orig;
// })

describe('buildFormData test suite', ()=>{
    
    beforeEach(()=>{
        jest.spyOn(window, 'FormData')
            .mockImplementation(()=>({
                append: mockAppend
            }));
    });

    it('appends 3 properties to formData. append is called 3 times', ()=>{
        const testData = {
            item1 : 'test1',
            item2 : 'test2',
            item3 : 'test3',
        };
        buildFormData(testData);
        expect(mockAppend).toHaveBeenCalledTimes(3);
    });

    // appends an image
    it('appends an image. append function called once', ()=>{
        const image = 'this is a test image';
        const testData = {
            image: [image, 'testImage2']
        };
        buildFormData(testData);
        expect(mockAppend).toHaveBeenCalledTimes(1);
        expect(mockAppend).toHaveBeenCalledWith("image", image);
    });

    it('stringifies an array. append called once', ()=>{
        const spyStringify = jest.spyOn(JSON, 'stringify');
        const testData = {
            array: ['test1', 'test2', 'test3']
        };
        buildFormData(testData);
        expect(mockAppend).toHaveBeenCalledTimes(1);
        expect(spyStringify).toHaveBeenCalledTimes(1);
        expect(mockAppend).toHaveBeenCalledWith("array", JSON.stringify(testData.array));
    });
});