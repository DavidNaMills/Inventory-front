const productFactoryHelper = ({data, usrLoc=null, types, isNew=true}) =>{
    const all = {};

    for(let x in data){
        if(x==='prodType'){
            all['type'] = data[x];
            all['typeName'] = types[data.prodType].displayValue
        }  
        else{
            all[x] = data[x];
            if(isNew && !all['locId']){
                all['locId'] = usrLoc;
            } 
        }
    }
    return all;
}

export default productFactoryHelper;