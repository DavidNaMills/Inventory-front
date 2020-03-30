import {useState} from 'react';

const useShowHook = (initValue=false) =>{
    const [isShow, setShow] = useState(initValue);

    const changeShow = (newValue=false) =>{
        if(typeof(initValue)==='boolean'){
            setShow(newValue);
        } else if (Object.prototype.toString.call(initValue) === '[object Object]'){
            let changed = false;
            const temp = JSON.parse(JSON.stringify(isShow));
            for(let x in newValue){
                if((x in temp)){
                    temp[x] = newValue[x];
                    changed = true;
                }
            };
            if(changed){
                setShow(temp);
            }
        }
    }

    const reverseBoolean = ()=>{
        if(typeof(initValue)==='boolean'){
            setShow(prev=>!prev);
        }
    }

    return{
        isShow,
        changeShow,
        reverseBoolean
    }
}

export default useShowHook;