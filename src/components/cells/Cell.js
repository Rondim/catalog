/**
 * Created by xax on 23.03.2017.
 */
import React from 'react';

const Cell = (props) => {
    const active = props.active? 'active' : '';
    return (
            <img
                draggable='false'
                src={props.url}
                id={props.id}
                className={'img-responsive img-rounded ' + active}/>

    );
};

export default Cell;
