import { createContext, useContext, useEffect, useReducer } from "react";
import {
    getCurrentLoggedInUser,
    getProfileApi,
    loginApi,
    logoutApi,
    updateProfileApi,
} from "../services/userService";

const authContext = createContext();
const initialState = {
    userAccount: {},
    isLoading: false,
    isLoggedIn: false,
    error: null,
    isAuthenticated: false,
    profile: {},
};

function authReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, error: null };
        case "ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "LOGIN":
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userAccount: action.payload,
                isAuthenticated: true,
            };
        case "LOGOUT":
            return initialState;
        case "SET_CURRENT_USER":
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload,
                isAuthenticated: action.isAuthenticated,
            };
        case "SESSION_ERROR":
            return {
                ...state,
                isAuthenticated: false,
                userAccount: {},
                isLoading: false,
                isLoggedIn: false,
            };
        case "SET_PROFILE":
            return { ...state, isLoading: false, profile: action.payload };
        case "UPDATE_PROFILE":
            return { ...state, isLoading: false, profile: action.payload };
        case "default":
            return state;
    }
}

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(
        authReducer,
        localStorage.getItem("initState")
            ? JSON.parse(localStorage.getItem("initState"))
            : initialState
    );

    const {
        userAccount,
        isLoading,
        isLoggedIn,
        error,
        isAuthenticated,
        profile,
    } = state;

    useEffect(() => {
        localStorage.setItem("initState", JSON.stringify(state));
    }, [state]);

    const login = async (formData) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await loginApi(formData);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            if (res.success) {
                dispatch({ type: "LOGIN", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };
    const logout = async () => {
        try {
            dispatch({ type: "START" });
            const res = await logoutApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            dispatch({ type: "LOGOUT" });
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const loggedInUser = async () => {
        let res;
        try {
            dispatch({ type: "START" });
            // dispatch({ type: "AUTHSTART" });
            res = await getCurrentLoggedInUser();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            dispatch({
                type: "SET_CURRENT_USER",
                payload: res.data,
                isAuthenticated: res.isAuthenticated,
            });
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            dispatch({ type: "SESSION_ERROR" });
            return res;
        }
    };

    const getProfile = async () => {
        let res;
        try {
            res = await getProfileApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            } else {
                dispatch({ type: "SET_PROFILE", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const updateProfile = async (updatedProfile) => {
        let res;
        try {
            res = await updateProfileApi(updatedProfile);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            } else {
                dispatch({ type: "UPDATE_PROFILE", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const value = {
        userAccount,
        isLoading,
        isLoggedIn,
        error,
        login,
        logout,
        loggedInUser,
        isAuthenticated,
        getProfile,
        updateProfile,
        profile,
        dispatch,
    };

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
}

function useAuth() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error(" authContext used outside its scope");
    }
    return context;
}

export { AuthContextProvider, useAuth };
