import {useState} from 'react';

const defaultState = {
    show: false,
    selected: null
};

const usePopup = () => {
    const [isOpen, setIsOpen] = useState(defaultState);

    const closePopup = () =>{
        setIsOpen(defaultState);
    }
    
    const openPopup = (data=null) =>{
        setIsOpen({
            show: true,
            selected: data
        });
    }

    return {
        isOpen,
        openPopup,
        closePopup
    }
}

export default usePopup;