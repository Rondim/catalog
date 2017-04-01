/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';

const Cell = (props) => {
    return (
            <img
                draggable='false'
                src={props.url}
                id={props.id}
                className="img-responsive img-rounded"/>

    );
};

export default Cell;
