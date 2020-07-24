import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/es/Route";

function App(props) {
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
                            <Profile state={props.appState.profilePage}/>
                        }
                    />
                    <Route
                        path='/dialogs'
                        render={ () =>
                            <Dialogs state={props.appState.messagesPage}/>
                        }
                    />
                </div>
          </div>
      </BrowserRouter>

  );
}

export default App;
