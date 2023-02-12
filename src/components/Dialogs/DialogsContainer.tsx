import {sendMessage} from "../../redux/dialogs/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {AppSateType} from "../../redux/redux-store";
import React from "react";

const mapStateToProps = (state: AppSateType) => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {sendMessage}), withAuthRedirect)(Dialogs);