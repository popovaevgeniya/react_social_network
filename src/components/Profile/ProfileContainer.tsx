import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {AppSateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppSateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

// props type for react-router
type PathParamsType = {
    userId: string,
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        //explicit typification (явная типизация) and + is conversion to string (+ это преобразование в строку)
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
               // todo: may be replace push with redirect
               this.props.history.push('/login');
            }
        }

        if (!userId) {
            console.error('ID should be exists in URI params or in state authorizedUserId')
        } else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer);