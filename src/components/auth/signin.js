/**
 * Created by xax on 23.02.2017.
 */
import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {signinUser} from '../../actions';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';



class Signin extends Component {
    componentWillUpdate(){
        this.props.authenticated? hashHistory.push('/#/'):''
    }
    renderAlert(){
        return (this.props.errorMessage ?
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{this.props.errorMessage}
                </div>:<div></div>
        )
    }
    render(){
        const {handleSubmit, submitting} = this.props;
        return(
            <form onSubmit={handleSubmit(this.props.signinUser)}>
                <Field name="email" type="email" component={renderField} label="email"/>
                <Field name="password" type="password" component={renderField} label="password"/>
                {this.renderAlert()}
                <button type="submit" disabled={submitting} className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function validate(formProps) {
    const errors={};

    if(!formProps.email){
        errors.email = 'Пожалуйста, введите email!'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Почтовый адрес не верен'
    }
    if(!formProps.password){
        errors.password = 'Пожалуйста, введите пароль!'
    }
    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error,authenticated: state.auth.authenticated};
}

Signin =  reduxForm({
    form: 'signin',
    validate
})(Signin);

Signin = connect(mapStateToProps,{signinUser})(Signin);

export default Signin;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span className="error">{error}</span>) )}
        </div>
    </div>
);