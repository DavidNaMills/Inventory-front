import { useLocaleDispatch, CHANGE_LOCALE } from '../../Context/LocaleContext';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';

import {localStorageFiles} from '../../consts/localStorageFiles';


const useChangeLanguage = () => {
    const {writeToStorage, readFromStorage} = useLocalStorage(localStorageFiles.locale);
    const changeLocale = useLocaleDispatch();

    const makeChange = (lang) =>{
        writeToStorage(lang);
        changeLocale({type: CHANGE_LOCALE, payload: lang});
    }
    
    const initLocale = () =>{
        const tLang = readFromStorage(localStorageFiles.locale);
        if(tLang){
            changeLocale({type: CHANGE_LOCALE, payload: JSON.parse(tLang)});
        }
    }

    return {
        makeChange,
        initLocale
    }
}

export default useChangeLanguage;