import React from "react";
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppSateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state: AppSateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<MapPropsType, DispatchPropsType, {}, AppSateType>(mapStateToProps, {logout})(HeaderContainer);