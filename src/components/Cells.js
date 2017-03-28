/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cell from './Cell'

export default class Cells extends Component {
    renderTr(i){
        let out=[<td key={i + this.props.cells[i][0].id}>{i}</td>];
        for(let j=0;j<6;j++){
            out.push(<td key={this.props.cells[i][j].id}><Cell url={this.props.cells[i][j].url} id={this.props.cells[i][j].id}/></td>);
        }
        return out;
    }
    renderTbody(){
        let out = [];
        for(let i=0;i<6;i++){
            out.push(<tr key={i}>{this.renderTr(i)}</tr>);
        }
        return out;
    }
    render(){
        return(
            <div className="cells_container">
                <table className="cells">
                    <tbody>
                        <tr><td/><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
                        {this.renderTbody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

