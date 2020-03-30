import react, { useState, useLayoutEffect } from 'react';

const usePositionRef = () => {
    const [posRef, setPos] = useState(0);


    const handleScroll=()=>{
        setPos(window.scrollY);
    }

    useLayoutEffect(() => {

        window.addEventListener('scroll', handleScroll)


        return () => window.removeEventListener('scroll', handleScroll)
    }, [window.scrollY]);

    return {
        posRef
    }
}

export default usePositionRef;