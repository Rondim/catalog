/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cell from './Cell'

const leter = ["A","B","C","D","E","F","G", "H","I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T","U", "V", "W", "X", "Y", "Z"];

export default class Cells extends Component {
    renderTr(i){
        if(i=="letter"){
            let out=[<td key="zero"/>];
            for(let j=0;j<6;j++){
                out.push(<td key={j}>{leter[j]}</td>);
            }
            return out;
        }
        let out=[<td key={i}>{i}</td>];
        for(let j=0;j<6;j++){
            if(this.props.cells[i][j].url){
                out.push(<td key={i+'-'+j}><Cell url={this.props.cells[i][j].url} id={this.props.cells[i][j].id}/></td>);
            }
            else{
                out.push(<td key={i+'-'+j}><Cell url=""/></td>);
            }
        }
        return out;
    }
    renderTbody(){
        let out = [<tr key="zero">{this.renderTr("letter")}</tr>];
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
                        {this.renderTbody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

