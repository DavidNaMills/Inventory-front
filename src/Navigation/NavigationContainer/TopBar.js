import React from 'react';
import LocationChanger from '../../Components/LocationChanger/LocationChanger';
import PersonalButton from '../../Components/PersonalButton/PersonalButton';


const style = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(193, 224, 207)',
    padding: '10px',
    borderBottom: 'solid rgb(132, 184, 155) 3px'
}


const TopBar = ({ name }) => (
    <div style={style}>
        <LocationChanger />
        <PersonalButton name={name} />
    </div>
)

export default TopBar;