import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
  return (
      <BrowserRouter>
          <div className="app-wrapper">
              <Header />
              <NavBar />
                <div className='app-wrapper-content'>
                    {/*<Route path='/profile' component={Profile}/>*/}
                    <Route
                        path='/profile'
                        render={ () =>
                            <Profile />
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
                </div>
          </div>
      </BrowserRouter>

  );
}

export default App;
