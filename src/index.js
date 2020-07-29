import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoreContext, {Provider} from "./StoreContext";

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        /*<React.StrictMode>*/
            <Provider store={store}>
                <App
                    /*state={state}
                    /!*state={store.getState()}*!/
                    dispatch={store.dispatch.bind(store)}
                    store={store}*/
                />
            </Provider>
        /*</React.StrictMode>*/,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});



serviceWorker.unregister();
