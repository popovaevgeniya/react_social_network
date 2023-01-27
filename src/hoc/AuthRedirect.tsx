import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppSateType} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppSateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>;
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppSateType>(mapStateToPropsForRedirect)(RedirectComponent);
}