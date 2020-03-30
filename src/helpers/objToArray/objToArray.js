const objToArray = (obj, field = null) => {
    const temp = [];
    for (let x in obj) {
        if (field) {
            temp.push(obj[x][field]);
            // temp.push(obj[field]);   // orignal
        } else {
            temp.push(obj[x]);
        }
    }
    return temp;
}


export default objToArray;