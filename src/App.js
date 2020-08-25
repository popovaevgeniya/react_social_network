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

const App = (props) => {
  return (
      <BrowserRouter>
          <div className="app-wrapper">
              <HeaderContainer />
              <NavBar />
                <div className='app-wrapper-content'>
                    {/*<Route path='/profile' component={Profile}/>*/}
                    <Route
                        path='/profile/:userId?'
                        render={ () =>
                            <ProfileContainer />
                        }
                    />
                    <Route
                        path='/dialogs'
                        render={ () =>
                            <DialogsContainer />
                        }
                    />
                    <Route
                        path='/users'
                        render={ () =>
                            <UsersContainer />
                        }
                    />
                    <Route
                        path='/login'
                        render={ () =>
                            <LoginPage />
                        }
                    />
                </div>
          </div>
      </BrowserRouter>

  );
}

export default App;
