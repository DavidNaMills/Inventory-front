import {useState} from 'react';

const useTableDisplay = () =>{
    const [toDisplayList, setDisplayList] = useState([]);

    const init = (data) =>{
        setDisplayList(data);
    }

    const addItem = (data) =>{
        const temp = JSON.parse(JSON.stringify(toDisplayList));
        const addTemp = temp.concat(data)
        setDisplayList(addTemp);
    }

    const updateItem = (data, id) =>{
        const temp = JSON.parse(JSON.stringify(toDisplayList));
        const index = temp.findIndex(x => x._id === id);
        const c = temp.filter(x => x._id !== id);
        c.splice(index, 0, data);
        setDisplayList(c);
    }

    const removeItem = (id) =>{
        const temp = JSON.parse(JSON.stringify(toDisplayList));
        const delTemp = temp.filter(x => x._id !== id);
        setDisplayList(delTemp);
    }

    return {
        toDisplayList,
        init,
        addItem,
        updateItem,
        removeItem
    }
}

export default useTableDisplay;