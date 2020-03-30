import productFactoryHelper from '../../helpers/productFactoryHelper/productFactoryHelper';

const testTypes = {
    '123': {displayValue: 'test123'},
    '456': {displayValue: 'test456'},
}

describe('productFactoryHelper test suite', ()=>{
    it('adds 2 properties: type and typeName, if property name is "prodType"', ()=>{
        const testData = {
            prodType: '456'
        };

        const res = productFactoryHelper({data: testData, types: testTypes, isNew: true});
        expect(Object.keys(res).length).toBe(2);
        expect(res).toHaveProperty('type', testData.prodType);
        expect(res).toHaveProperty('typeName', testTypes['456'].displayValue);
    });
    
    it('adds the locId if is new and doesnt already exist', ()=>{
            const mockUsrId = 'superId123456789';
            const testData = {
                myName: 'alan johnson'
            };
    
            const res = productFactoryHelper({data: testData, usrLoc: mockUsrId,  types: testTypes, isNew: true});
            expect(Object.keys(res).length).toBe(2);
            expect(res).toHaveProperty('myName', testData.myName);
            expect(res).toHaveProperty('locId', mockUsrId);
    });

    it('does not add the locId if is new but already exist', ()=>{
        const mockUsrId = 'superId123456789';
        const testData = {
            myName: 'alan johnson',
            myAge: '123456789'
        };

        const res = productFactoryHelper({data: testData, usrLoc: mockUsrId,  types: testTypes, isNew: true});
        expect(Object.keys(res).length).toBe(3);
        expect(res).toHaveProperty('myName', testData.myName);
        expect(res).toHaveProperty('myAge', testData.myAge);
        expect(res).toHaveProperty('locId', mockUsrId);
    });
});