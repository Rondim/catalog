/**
 * Created by xax on 23.03.2017.
 */
import React, {Component} from 'react';
import Cells from '../components/cells/Cells';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions';

class DragAndDropCells extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      i0: this.props.Cells.i0,
      j0: this.props.Cells.j0
    };
  }

  componentWillUpdate() {
    this.props.fetchCells();
  }

  handleKeyDown(e) {
    if (e.keyCode === 39) {
      this.setState((prevState) => {
        return {j0: prevState.j0 + 1};
      });
    } else if (e.keyCode === 37) {
      this.setState((prevState) => {
        if (prevState.j0 > 0) {
          return {j0: prevState.j0 - 1};
        }
      });
    } else if (e.keyCode === 38) {
      this.setState((prevState) => {
        if (prevState.i0 > 0) {
          return {i0: prevState.i0 - 1};
        }
      });
    } else if (e.keyCode === 40) {
      this.setState((prevState) => {
        return {i0: prevState.i0 + 1};
      });
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      this.props.Cells.active.forEach(coord => {
        const i = coord.i;
        const j = coord.j;
        const id = this.props.Cells.list[i][j].id;
        this.props.removeCell(id, i, j);
      });
    }
  }

  render() {
    return (
      <div className="container" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Grid>
          <Row className="show-grid">
            <Col lg={12} md={12} xs={12}>
              <Cells
                i0={this.state.i0}
                j0={this.state.j0}
                di={this.props.Cells.di}
                dj={this.props.Cells.dj}
                cells={this.props.Cells.list}
                active={this.props.Cells.active}
                handleCopy={this.props.copyCell}
                handleRemove={this.props.removeCell}
                handleSelect={this.props.setActiveCell}
                handleResetSelected={this.props.resetActiveCells}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {Cells: state.cells};
}

export default connect(mapStateToProps, actions)(DragAndDropCells);
