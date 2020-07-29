import {connect} from "react-redux";
import {subscribeActionCreator, setUsersActionCreator, unsubscribeActionCreator} from "../../redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        subscribe: (userId) => {
            dispatch(subscribeActionCreator(userId))
        },
        unsubscribe: (userId) => {
            dispatch(unsubscribeActionCreator(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users) ;