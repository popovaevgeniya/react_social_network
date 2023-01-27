import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppSateType} from "./redux/redux-store";

const mapStateToProps = (state: AppSateType) => ({
    initialized: state.app.initialized
})

type PropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<PropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavBar/>
                    <div className='app-wrapper-content'>
                        {/*<Route path='/profile' component={Profile}/>*/}
                        <Route
                            path='/profile/:userId?'
                            render={() =>
                                <ProfileContainer/>
                            }
                        />
                        <Route
                            path='/dialogs'
                            render={() =>
                                <DialogsContainer/>
                            }
                        />
                        <Route
                            path='/users'
                            render={() =>
                                <UsersContainer pageTitle="Users page"/>
                            }
                        />
                        <Route
                            path='/login'
                            render={() =>
                                <LoginPage/>
                            }
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps, {initializeApp})(App);
