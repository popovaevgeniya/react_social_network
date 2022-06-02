import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import s from './../common/FormsControls/FormControl.module.css';
import {AppSateType} from "../../redux/redux-store";

const LoginForm: FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
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

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type LoginFormValuesType = {
    rememberMe: boolean
    password: string
    email: string
}

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = ({login, isAuth}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe);
    };
    if(isAuth) return <Redirect to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state: AppSateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login); //здесь login является thunk creator