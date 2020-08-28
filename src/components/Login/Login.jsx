import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import s from './../common/FormsControls/FormControl.module.css';

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='E-mail' component={Input} type="email" name='email' validate={[required]}/>
        </div>
        <div>
            <Field placeholder='Password' component={Input} type="password" name='password' validate={[required]}/>
        </div>
        <div>
            <Field type="checkbox" component={Input} name='rememberMe'/> Remember me
        </div>
        {props.error && <div className={s.formSummeryError}>
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };
    if(props.isAuth) return <Redirect to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login})(Login); //здесь login является thunk creator