import React from "react";
import store from "./redux/redux-store";

const StoreContext = React.createContext(null);

export const Provider = (props) => {
    return  <StoreContext.Provider value={store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;