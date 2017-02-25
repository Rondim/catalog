/**
 * Created by xax on 19.02.2017.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };
        componentWillMount() {
            if(!this.props.authenticated){
                this.props.checkAuthentificated();
            }
        }
        componentWillUpdate(nextProps){
            if(!nextProps.authenticated) {
                nextProps.checkAuthentificated();
            }
        }
        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {authenticated: state.auth.authenticated}
    }
    return connect(mapStateToProps,actions)(Authentication);
}