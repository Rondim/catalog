/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cells from '../components/Cells';
import { Grid,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../actions'

class DragAndDropCells extends Component {
    render(){

        return(
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col lg={6} md={6} xs={6}>
                            <Cells cells={this.props.Cells.list}/>
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