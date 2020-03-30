import React from 'react';
import { isMobileOnly, isMobile } from 'react-device-detect';
import StaffTypeRow from '../../TableDisplay/Row/StaffTypeRow';
import classes from '../Popup.module.scss';
import Title from '../../Title/Title';
import {useLocale} from '../../../Context/LocaleContext';

const config = {main: ['', 'name', 'role']};

const PopupStaffRow = (props) => {
    const { staff, isPortrait } = props;
    const locale = useLocale();

    const tempScrollableStaff = {
        overflowY: 'auto',
        height: isMobile ? isPortrait ? '20vh' : '10vw' : '15vh',
    }
    
    return (
        staff.length > 0 ? (
            <div className={classes.popup__color1}>
                <div className={classes.popup__mediumSpacing}>
                    <Title message={staff.length>0 ? `${locale['staff_count']}: ${staff.length} ${locale['in_ttl']}` : `${locale['no_staff_type']}`} size='h4' />
                </div>
                <div style={tempScrollableStaff}>
                    {
                        staff.map((c, d) =>
                            <div key={d} className={d % 2 ? classes.popup__row_odd : classes.popup__row_even}>
                                <StaffTypeRow
                                    config={config}
                                    data={c}
                                    withTitle={false}
                                    isMobileOnly={isMobileOnly}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        )
            : <p className={classes.popup__mediumSpacing}>No staff at this location</p>
    )
}

export default PopupStaffRow;