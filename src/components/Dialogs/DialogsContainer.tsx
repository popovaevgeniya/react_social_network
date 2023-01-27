import {sendMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {AppSateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppSateType) => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}

// @ts-ignore
export default compose(connect(mapStateToProps, {sendMessage}), withAuthRedirect)(Dialogs);