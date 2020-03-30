import React, { useReducer, useContext } from 'react';

import {en} from '../Locale/en';
import {ch} from '../Locale/ch';

export const CHANGE_LOCALE = 'change_locale';

const allLocale = {
    'en': en,
    'ch': ch
};

const LocaleState = React.createContext();
const LocaleDispatch = React.createContext();

const localeReducer = (state = en, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            if(!allLocale[action.payload]){
                return ch;
            }
            return allLocale[action.payload];
        default:
            return ch;
    }
}

const LocaleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(localeReducer, ch);

    return (
        <LocaleState.Provider value={state}>
            <LocaleDispatch.Provider value={dispatch}>
                {children}
            </LocaleDispatch.Provider>
        </LocaleState.Provider>
    )
};

const useLocale = () => {
    const locale = useContext(LocaleState);
    return locale;
};

const useLocaleDispatch = () => {
    const changeLocale = useContext(LocaleDispatch);
    return changeLocale;
};

export {
    LocaleProvider,
    useLocale,
    useLocaleDispatch
}