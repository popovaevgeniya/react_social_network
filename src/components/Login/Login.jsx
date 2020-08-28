import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='Login' component={Input} type="text" name='login' validate={[required]}/>
        </div>
        <div>
            <Field placeholder='Password' component={Input} type="text" name='password' validate={[required]}/>
        </div>
        <div>
            <Field type="checkbox" component={Input} name='rememberMe'/> Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return <div>
        <h1>
            LOGIN
        </h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

export default Login;