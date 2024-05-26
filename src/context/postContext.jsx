import { createContext, useContext, useReducer } from "react";
import {
    createPostApi,
    deletePostApi,
    getAllPostsApi,
    getMyPostsApi,
    getSinglePostApi,
} from "../services/postServices";

const postContext = createContext();

const initialState = {
    posts: [],
    isLoading: false,
    error: {},
    selectedPost: {},
    myPosts: [],
    comments: [],
};

function postReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, error: null };
        case "ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "ADD_POST":
            return {
                ...state,
                isLoading: false,
                posts: [...state.posts, action.payload],
                myPosts: [...state.posts, action.payload],
            };
        case "ALL_POSTS":
            return { ...state, isLoading: false, posts: action.payload };
        case "MY_POSTS":
            return { ...state, isLoading: false, myPosts: action.payload };
        case "POST_BY_ID":
            return { ...state, isLoading: false, selectedPost: action.payload };
        case "DELETE_POST_BY_ID":
            return {
                ...state,
                isLoading: false,
                myPosts: state.myPosts.filter(
                    (ele) => ele._id !== action.payload
                ),
                posts: state.posts.filter((ele) => ele._id !== action.payload),
            };
        case "default":
            return state;
    }
}

function PostContextProvider({ children }) {
    const [{ posts, isLoading, error, myPosts, selectedPost }, dispatch] =
        useReducer(postReducer, initialState);

    const createPost = async (formData) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await createPostApi(formData);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    error: res.error,
                };
            } else {
                dispatch({ type: "ADD_POST", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const getAllPosts = async () => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await getAllPostsApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    error: res.error,
                };
            } else {
                dispatch({ type: "ALL_POSTS", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const getMyPosts = async () => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await getMyPostsApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    error: res.error,
                };
            } else {
                dispatch({ type: "MY_POSTS", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const getPostById = async (id) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await getSinglePostApi(id);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    error: res.error,
                };
            } else {
                dispatch({ type: "POST_BY_ID", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const deletePostById = async (id) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await deletePostApi(id);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    error: res.error,
                };
            } else {
                dispatch({
                    type: "DELETE_POST_BY_ID",
                    payload: id,
                });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const value = {
        posts,
        isLoading,
        error,
        myPosts,
        selectedPost,
        createPost,
        getAllPosts,
        getMyPosts,
        getPostById,
        deletePostById,
    };
    return (
        <postContext.Provider value={value}>{children}</postContext.Provider>
    );
}

function usePost() {
    const context = useContext(postContext);
    if (!context) {
        throw new Error("post scope not defined");
    }
    return context;
}

export { PostContextProvider, usePost };

/**
 * 
 *  const createPost = async()=>{
        try {
            
        } catch (error) {
            
        }
    }
 */
