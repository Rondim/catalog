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
        this.handlerSelect=this.handlerSelect.bind(this);
        this.state = {
            i:false,
            j:false,
            cells:this.props.cells
        };
    }
    handlerSelect(e,i,j){
        e.preventDefault();
        if (!e.ctrlKey && !e.shiftKey ) this.props.handleResetSelected(i,j);
        if(e.shiftKey){
            let iMin = false;
            let jMin = false;
            this.props.active.forEach(coord => {
                const ia = coord.i;
                const ja = coord.j;
                if(iMin===false&&jMin===false){
                    iMin = ia;
                    jMin = ja;
                }
                iMin = iMin>ia ? ia : iMin;
                jMin = jMin>ja ? ja : jMin;
            });
            this.props.handleResetSelected(i,j);
            const nMin = iMin<i ? iMin: i;
            const nMax = iMin<i ? i: iMin;
            const mMin = jMin<j ? jMin: j;
            const mMax = jMin<j ? j: jMin;
            for(let n=nMin; n<=nMax; n++){
                for(let m=mMin; m<=mMax; m++){
                        this.props.handleSelect(n,m);
                }
            }
        }
        else{
            this.props.handleSelect(i,j);
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
        const copy = !!e.altKey;
        if(this.props.active.length<2){
            this.setState((prevState) => {
                let cells = prevState.cells;
                cells = this.action(prevState.i,prevState.j,i,j,copy,cells);
                return {cells, i: false, j: false}
            });
        }
        else{
            let iMin = false;
            let jMin = false;
            this.props.active.forEach(coord => {
                const ia = coord.i;
                const ja = coord.j;
                if(iMin===false&&jMin===false){
                    iMin = ia;
                    jMin = ja;
                }
                iMin = iMin>ia ? ia : iMin;
                jMin = jMin>ja ? ja : jMin;
            });
            this.props.active.forEach(coord => {
                const n = coord.i;
                const m = coord.j;
                this.setState((prevState) => {
                    let cells = prevState.cells;
                    cells = this.action(n,m,i+n-iMin,j+m-jMin,copy,cells);
                    return {cells, i: false, j: false}
                });
            });
        }
    }
    action(iOld,jOld,i,j,copy,cells){
        if(cells[iOld][jOld].id){
            if(copy) {
                cells[i][j]={
                    item: cells[iOld][jOld].item,
                    active: false,
                    id: null
                };
                this.props.handleCopy(cells[iOld][jOld].item.id, i, j);
                return cells;
            }
            else{
                this.props.handleCopy(cells[iOld][jOld].item.id, i, j);
                if(cells[i][j].item&&cells[i][j].item.id&&cells[i][j].id!==null) this.props.handleCopy(cells[i][j].item.id, iOld, jOld);
                else this.props.handleRemove(cells[iOld][jOld].id, iOld, jOld);
                const tmp = cells[iOld][jOld];
                cells[iOld][jOld] = cells[i][j];
                cells[i][j] = tmp;
                return cells;
            }
        }
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
            let cell = tr[j] ? tr[j] : free;
            cell.item = cell.item===undefined ? {url:''} : cell.item;
            out.push(
                <td
                    key={i+'-'+j}
                    draggable={!!cell.id}
                    onDragStart={() => this.handlerDragStart(i,j)}
                    onDrop={(e)=>this.handlerDragStop(e,i,j)}
                    onDragOver={this.preventDefault}
                    onClick={cell.id?(e) => this.handlerSelect(e,i,j):false}
                    onContextMenu={cell.id?(e) => this.handlerSelect(e,i,j):false}
                    className="cell"
                >

                <Cell url={cell.item.url} id={cell.id} active={cell.active}/>
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

