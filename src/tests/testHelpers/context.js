
jest.mock('../../Context/LocaleContext');
import {useLocale} from '../../Context/LocaleContext';
import {en} from '../../Locale/en';

useLocale.mockImplementation(()=>({
    ...en
}));