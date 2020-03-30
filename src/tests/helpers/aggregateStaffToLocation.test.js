import aggStaff from '../../helpers/aggregateStaffToLocation/aggregateStaffToLocation';

const testData = [
    {
        _id: 'fdsafdsa',
        name: 'bob',
        location: ['fdfdfsda'],
        locId: '1',
        add: 'somewhere'
    },
    {
        _id: 'fdsafd432432sa',
        name: 'alan',
        location: ['zzds', 'xxaa'],
        locId: '2',
        add: 'everywhere'
    },
    {
        _id: 'fdsafd43243243432423sa',
        name: 'jimmy',
        location: ['zzds', 'fdfdfsda'],
        locId: '3',
        add: 'nowhere'
    },
];

const key = 'location';
describe('aggregateStaffToLocation helper test suite', ()=>{
    it('returns an object with 3 keys', ()=>{
        const res = aggStaff(testData, key);
        expect(Object.keys(res).length).toBe(3);
        expect(res).toHaveProperty('fdfdfsda', [testData[0], testData[2]]);
        expect(res).toHaveProperty('zzds', [testData[1], testData[2]]);
        expect(res).toHaveProperty('xxaa', [testData[1]]);
    });
});