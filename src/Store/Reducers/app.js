const initialState = {
    registered: true,
    loggedin: false,
    user: null,
    transactions: null,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "to register new user":
            return { ...state, registered: false };
        case "user registered":
            return { ...state, registered: true };
        case "user logged in":
            return { ...state, loggedin: true, user: action.userObj, transactions: action.transactions };
        case "logged out":
            return { ...state, registered: true, loggedin: false, user: action.userObj, transactions: null }
        case "transaction added":
            return { ...state, transactions: action.transactions }
        case "transaction updated":
            return { ...state, transactions: action.transactions }
        case "transaction deleted":
            return { ...state, transactions: action.transactions }
        default:
            return state;
    }
};