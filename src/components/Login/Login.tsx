import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from 'react-redux';
import {login} from "../../redux/auth/auth-reducer";
import {Redirect} from "react-router";
import s from '../FormsControls/FormControl.module.css';
import {selectIsAuth} from '../../redux/auth/auth-selectors';

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder='E-mail' component={Input} type="email" name='email' validate={[required]}/>
        </div>
        <div>
            <Field placeholder='Password' component={Input} type="password" name='password' validate={[required]}/>
        </div>
        <div>
            <Field type="checkbox" component={Input} name='rememberMe'/> Remember me
        </div>
        {error && <div className={s.formSummeryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm);

type LoginFormValuesType = {
    rememberMe: boolean
    password: string
    email: string
}

const LoginPage: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    };

    if (isAuth) return <Redirect to='/profile'/>
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};


export default LoginPage