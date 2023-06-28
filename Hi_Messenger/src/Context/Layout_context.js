import {createContext, useContext, useReducer} from "react";

var Layout_state_context = createContext();
var Layout_dispatch_context = createContext();

function Tweet_reducer(state, action) {
    switch (action.type) {
        case "TOGGLE_Drawer" : {
            return {...state, drawer_open : !state.drawer_open};
        }
        default:{
            throw new Error("unhandled action type");
        }

    }
}

function Layout_provider({children}) {
    const [state, dispatch] = useReducer(Tweet_reducer, {
        drawer_open : false
    });

    return(
        <Layout_state_context.Provider value={state}>
            <Layout_dispatch_context.Provider value={dispatch}>
                {children}
            </Layout_dispatch_context.Provider>
        </Layout_state_context.Provider>
    );
}

function Use_Layout_State() {
    let layout_state = useContext(Layout_state_context);
    if (layout_state === undefined){
        throw new Error("useLayoutState must be use within a TweetProvider");
    }
    return layout_state;
}

function Use_Layout_Dispatch() {
    let layout_dispatch = useContext(Layout_dispatch_context);
    if (layout_dispatch === undefined){
        throw new Error("useLayoutDispatch must be use within a TweetProvider");
    }
    return layout_dispatch;
}

function toggle_drawer(dispatch) {
    dispatch({
        type : "TOGGLE_Drawer"
    })
}

export {
    Layout_provider,
    Use_Layout_Dispatch,
    Use_Layout_State,
    toggle_drawer
};