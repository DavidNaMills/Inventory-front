
const aggregateStaffToLocation = (arr, key) =>{
    const temp = {};

    arr.forEach(x=>{
        x[key].forEach(y=>{
            if(temp[y]){
                temp[y].push(x);
            } else {
                temp[y] = [x]
            }
        })
    })
    return temp;
}

export default aggregateStaffToLocation;