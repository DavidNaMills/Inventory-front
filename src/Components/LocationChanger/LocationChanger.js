import React from 'react';
import classes from './locationChanger.module.scss';
import { useSelector } from 'react-redux';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import PlaceIcon from '@material-ui/icons/Place';


const LocationChanger = () => {
    const { staff, types } = useSelector(state => state);
    const { changeCurrentLocationDispatch } = useDispatchHook();
    return (
        (staff.token && Object.keys(types.locations).length > 0)
        && <div className={classes.locationChanger}>
            <span className={classes.locationChanger__bold}><PlaceIcon/> </span>


            {(staff.staff.baseId.length > 1)
                ?
                <select onChange={(e) => changeCurrentLocationDispatch(e.target.value)} className={classes.locationChanger__selectStyle}>
                    {staff.staff.baseId.map(x => <option key={x} value={x}>{types.locations[x].displayValue}</option>)}
                </select>
                : <p>{types.locations[staff.staff.baseId[0]].displayValue}</p>
            }
        </div>

    )
}
export default React.memo(LocationChanger);