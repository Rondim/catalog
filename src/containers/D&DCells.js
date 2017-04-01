/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cells from '../components/Cells';
import { Grid,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../actions'

class DragAndDropCells extends Component {
    constructor(props){
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state={
            i0: this.props.Cells.i0,
            j0: this.props.Cells.j0,
            list: this.props.Cells.list
        }
    }
    handleKeyDown(e){
        console.log(this.props.Cells.list[0].length);
        if(e.keyCode === 39){
            this.setState((prevState) => {
                return{j0:prevState.j0+1}
            });
        }
        else if(e.keyCode === 37){
            this.setState((prevState) => {
                if(prevState.j0>0){
                    return{j0:prevState.j0-1}
                }
            });
        }
        else if(e.keyCode === 38){
            this.setState((prevState) => {
                if(prevState.i0>0){
                    return{i0:prevState.i0-1}
                }
            });
        }
        else if(e.keyCode === 40){
            this.setState((prevState) => {
                return{i0:prevState.i0+1}
            });
        }
    }
    render(){

        return(
            <div className="container" tabIndex="0" onKeyDown={this.handleKeyDown}>
                <Grid>
                    <Row className="show-grid">
                        <Col lg={6} md={6} xs={6}>
                            <Cells i0={this.state.i0} j0={this.state.j0} di={this.props.Cells.di}  dj={this.props.Cells.dj} cells={this.state.list}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { Cells: state.cells};
}

export default connect(mapStateToProps,actions)(DragAndDropCells);