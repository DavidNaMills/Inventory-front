import objToArray from '../../helpers/objToArray/objToArray';

const testData = {
    david: {
        name: 'David',
        color: 'blue'
    },
    alan: {
        name: 'alan',
        color: 'purple'
    },
};

describe('objToArray test suite', ()=>{
    it('converts the whole object to an array', ()=>{
        const res = objToArray(testData);
        expect(res.length).toBe(2);
        expect(res).toEqual([testData.david, testData.alan]);
    });

    it('adds a single field to the array', ()=>{
        const res = objToArray(testData, 'color');
        expect(res.length).toBe(2);
        expect(res).toEqual([testData.david.color, testData.alan.color]);
    });
});