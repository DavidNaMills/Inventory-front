import React from 'react';


const SelectSingle = ({ label = null, ...rest }) => {
    return (
        <div>
            {label && <label htmlFor={rest.id}>{label}</label>}
            <div>
                < select onChange={e => rest.changed(e, rest.id)} value={rest.value ? rest.value : ''}>
                    {rest.elementConfig.options.map(x =>
                        <option
                            key={x._id}
                            // value={x._id}
                        >
                            {x.displayValue}
                        </option>
                    )}
                </select>
            </div>

        </div>
    )
}

export default SelectSingle;