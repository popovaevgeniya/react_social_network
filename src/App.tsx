import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersPage from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import LoginPage from './components/Login/Login';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {AppSateType} from './redux/redux-store';
import 'antd/dist/reset.css';

import {Layout, Menu, Breadcrumb} from 'antd';
import logo from './assets/images/logo.png';
import HeaderApp from './components/Header/Header';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

const mapStateToProps = (state: AppSateType) => ({
    initialized: state.app.initialized
})

type PropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}

const App: React.FC<PropsType & DispatchPropsType> = (props) => {
    useEffect(() => {
        props.initializeApp();
    })

    if (!props.initialized) {
        return <Preloader/>
    }

    return (
        <BrowserRouter>
            <Layout>
                <Header className="header">
                    <div className="logo"><img src={logo} alt='logo'/></div>
                    <HeaderApp/>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                style={{height: '100%'}}
                            >
                                <SubMenu
                                    key="my_profile"
                                    title={<span>My Profile</span>}
                                >
                                    <Menu.Item key="profile"><Link to='/profile'>Profile</Link></Menu.Item>
                                    <Menu.Item key="dialogs"><Link to='/dialogs'>Massages</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="users"><Link to='/users'>Users</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Route
                                path="/profile/:userId?"
                                render={() =>
                                    <ProfileContainer/>
                                }
                            />
                            <Route
                                path="/dialogs"
                                render={() =>
                                    <DialogsContainer/>
                                }
                            />
                            <Route
                                path="/users"
                                render={() =>
                                    <UsersPage pageTitle="Users page"/>
                                }
                            />
                            <Route
                                path="/login"
                                render={() =>
                                    <LoginPage/>
                                }
                            />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2023 Created by Eugenia Popova</Footer>
            </Layout>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps, {initializeApp})(App);
