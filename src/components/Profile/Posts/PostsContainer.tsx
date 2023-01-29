import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import Posts, {DispatchPropsType, MapPropsType} from "./Posts";
import {AppSateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppSateType) => {
    return {
        posts: state.profilePage.posts
    }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppSateType>(mapStateToProps, {addPost: addPostActionCreator})(Posts);