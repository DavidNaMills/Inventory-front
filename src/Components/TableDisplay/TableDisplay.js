import React from 'react';
import classes from './tableDisplay.module.scss';
import { useLocale } from '../../Context/LocaleContext';
import { isMobileOnly } from 'react-device-detect';
import StaffTypeRow from './Row/StaffTypeRow';
import ProductTypeRow from './Row/ProductTypeRow/ProductTypeRow';
import ProductRow from './Row/ProductRow/ProductRow';
import Button from '../Button/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';


export const TableDisplay = (props) => {
    const locale = useLocale();
    const { list, config, update = null, remove = null, formName, viewMore = null, isSelected=null } = props;

    const all = list.map((x, count) => {
        let temp = [];
        const tStyle = [classes.tableDisplay];

        if (isSelected === x._id) { tStyle.push(classes.tableDisplay__selected) }
        else if (count % 2) { tStyle.push(classes.tableDisplay__even) }
        else { tStyle.push(classes.tableDisplay__odd) }

        switch (formName) {
            case 'staff':
                temp.push(
                    <StaffTypeRow
                        key={count}
                        config={config}
                        data={x}
                        showInfo={isMobileOnly ? false : true}
                    />
                )
                break;
            case 'productTypes':
                temp.push(
                    <ProductTypeRow
                        key={count}
                        config={config}
                        data={x}
                    />
                )
                break;

            case 'locationTypes':
                temp.push(
                    <ProductTypeRow
                        key={count}
                        config={config}
                        data={x}
                    />
                )
                break;
            case 'products':
                temp.push(
                    <ProductRow
                        key={count}
                        config={config}
                        data={x}
                        withImage={isMobileOnly? false : true}
                        withInfo={isMobileOnly? false : true}
                    />
                )
                break;
            default:
                return <p key={count}>ERROR</p>
        }
        return (
            <div className={tStyle.join(' ')} key={count}>
                {temp}
                <div className={classes.tableDisplay__optionsStyle}>
                    {update && temp.length > 0 &&
                        <Button onClick={() => update(JSON.parse(JSON.stringify(x)))} noStyle Icon={CreateIcon} />
                    }
                    {remove && temp.length > 0 && <Button onClick={() => remove(x._id)} type='danger' label={locale.remove} />}
                    {viewMore && <Button onClick={() => viewMore(x)} type='base' noStyle Icon={MoreHorizIcon} />}
                </div>
            </div>
        )
    })

    return (
        <div>
            { 
                all.length > 0
                ? all
                : <div className={classes.tableDisplay__message}><p className={classes.tableDisplay__message_text}>Nothing to display</p></div>
            }
            
        </div>
    );
}

export default TableDisplay;