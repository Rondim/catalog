/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cell from './Cell'

const leter = ["A","B","C","D","E","F","G", "H","I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T","U", "V", "W", "X", "Y", "Z"];

export default class Cells extends Component {
    constructor(props){
        super(props);
        this.handlerDragStart=this.handlerDragStart.bind(this);
        this.handlerDragStop=this.handlerDragStop.bind(this);
        this.preventDefault=this.preventDefault.bind(this);
        this.state = {
            i:false,
            j:false,
            cells:this.props.cells
        }
    }
    handlerDragStart(i,j){
        this.setState({i,j});
    }
    preventDefault(e){
        e.preventDefault();
    }
    handlerDragStop(e,i,j){
        e.preventDefault();
        this.setState((prevState) => {
            let cells = prevState.cells;
            const tmp = cells[prevState.i][prevState.j];
            cells[prevState.i][prevState.j]=cells[i][j];
            cells[i][j]=tmp;
            return{cells,i:false,j:false}
        });
    }
    renderTr(i){
        const j0=this.props.j0;
        const dj=this.props.dj;
        if(i=="letter"){
            let out=[<td key="zero"/>];
            for(let j=j0;j<j0+dj;j++){
                out.push(<td key={j}>{leter[j]}</td>);
            }
            return out;
        }
        let out=[<td key={i}>{i}</td>];
        for(let j=j0;j<j0+dj;j++){
            out.push(
                <td
                    key={i+'-'+j}
                    draggable="true"
                    onDragStart={()=>this.handlerDragStart(i,j)}
                    onDrop={(e)=>this.handlerDragStop(e,i,j)}
                    onDragOver={this.preventDefault}
                >

                <Cell url={this.state.cells[i][j].url} id={this.state.cells[i][j].id}/>
            </td>);
        }
        return out;
    }
    renderTbody(){
        const i0=this.props.i0;
        const di=this.props.di;
        let out = [<tr key="zero">{this.renderTr("letter")}</tr>];
        for(let i=i0;i<i0+di;i++){
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

