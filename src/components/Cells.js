/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cell from './Cell'

const leter = ["A","B","C","D","E","F","G", "H","I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T","U", "V", "W", "X", "Y", "Z"];
const free={item:{url:""},id:null};
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
        };
    }
    handlerDragStart(i,j){
        this.setState({i,j});
    }
    preventDefault(e){
        e.preventDefault();
    }
    handlerDragStop(e,i,j){
        e.preventDefault();
        const copy = !!e.altKey;
        this.setState((prevState) => {
            let cells = prevState.cells;
            if(cells[prevState.i][prevState.j].id){
                if(copy) {
                    cells[i][j] = cells[prevState.i][prevState.j];
                    cells[i][j].id = null;
                    this.props.handleCopy(cells[prevState.i][prevState.j].item.id, i, j);
                    return {cells, i: false, j: false}
                }
                else{
                    this.props.handleCopy(cells[prevState.i][prevState.j].item.id, i, j);
                    if(cells[i][j].item&&cells[i][j].item.id&&cells[i][j].id!==null) this.props.handleCopy(cells[i][j].item.id, prevState.i, prevState.j);
                    else this.props.handleRemove(cells[prevState.i][prevState.j].id, prevState.i, prevState.j);
                    const tmp = cells[prevState.i][prevState.j];
                    cells[prevState.i][prevState.j] = cells[i][j];
                    cells[i][j] = tmp;
                    return {cells, i: false, j: false}
                }
            }
        });
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
        let tr = this.state.cells[i]!==undefined ? this.state.cells[i] : [];
        let out=[<td key={i}>{i}</td>];
        for(let j=j0;j<j0+dj;j++){
            const cell = tr[j] ? tr[j] : free;
            //console.log(cell,i,j);
            out.push(
                <td
                    key={i+'-'+j}
                    draggable={!!cell.id}
                    onDragStart={()=>this.handlerDragStart(i,j)}
                    onDrop={(e)=>this.handlerDragStop(e,i,j)}
                    onDragOver={this.preventDefault}
                    className="cell"
                >

                <Cell url={cell.item.url} id={cell.id}/>
            </td>);
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

