/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';

const Cell = (props) => {
    return (
            <a href="#">
                <img src={props.url} id={props.id} className="img-responsive img-rounded"/>
            </a>
    );
};

export default Cell;
