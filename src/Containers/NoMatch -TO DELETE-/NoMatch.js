import React from 'react';
import {NavLink} from 'react-router-dom';

const NoMatch = () =>(
    <div>
        No idea why you came here
        <NavLink to='/dashboard' />
    </div>
)

export default NoMatch;
