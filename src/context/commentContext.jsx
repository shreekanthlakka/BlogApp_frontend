import { createContext, useContext, useReducer } from "react";
import {
    createCommentByPostIdApi,
    deleteCommentByPostIdApi,
    getAllCommentByPostIdApi,
    updateCommentByPostIdApi,
} from "../services/postServices";

const commentContext = createContext();

const initialState = {
    comments: [],
    isLoading: false,
    error: {},
    commentsByPostId: [],
};

function commentReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, error: null };
        case "ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "ADD_COMMENT_BY_POSTID":
            return {
                ...state,
                isLoading: false,
                commentsByPostId: [...state.commentsByPostId, action.payload],
            };
        case "GET_COMMENTS_BY_POSTID":
            return {
                ...state,
                isLoading: false,
                commentsByPostId: action.payload,
            };
        case "UPDATE_COMMENTS_BY_POSTID":
            return {
                ...state,
                isLoading: false,
                commentsByPostId: state.commentsByPostId.map((ele) =>
                    ele._id === action.payload._id
                        ? { ...ele, content: action.payload.content }
                        : ele
                ),
            };
        case "DELETE_COMMENTS_BY_POSTID":
            return {
                ...state,
                isLoading: false,
                commentsByPostId: state.commentsByPostId.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case "default":
            return state;
    }
}

function CommentContextProvider({ children }) {
    const [{ comments, isLoading, error, commentsByPostId }, dispatch] =
        useReducer(commentReducer, initialState);

    const createCommentByPostId = async (postId, obj) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await createCommentByPostIdApi(postId, obj);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                    error: res.error,
                };
            } else {
                dispatch({ type: "ADD_COMMENT_BY_POSTID", payload: res.data });
                return res;
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const getAllCommentsByPostId = async (postId) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await getAllCommentByPostIdApi(postId);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                    error: res.error,
                };
            } else {
                dispatch({ type: "GET_COMMENTS_BY_POSTID", payload: res.data });
                return res;
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const updateCommentByPostId = async (postId, commentId, updatedObj) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await updateCommentByPostIdApi(postId, commentId, updatedObj);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                    error: res.error,
                };
            } else {
                dispatch({
                    type: "UPDATE_COMMENTS_BY_POSTID",
                    payload: res.data,
                });
                return res;
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const deleteCommentByPostId = async (postId, commentId) => {
        let res;
        try {
            dispatch({ type: "START" });
            res = await deleteCommentByPostIdApi(postId, commentId);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                    error: res.error,
                };
            } else {
                dispatch({
                    type: "DELETE_COMMENTS_BY_POSTID",
                    payload: res.data._id,
                });
                return res;
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
            return res;
        }
    };

    const value = {
        comments,
        isLoading,
        error,
        commentsByPostId,
        createCommentByPostId,
        getAllCommentsByPostId,
        updateCommentByPostId,
        deleteCommentByPostId,
    };
    return (
        <commentContext.Provider value={value}>
            {children}
        </commentContext.Provider>
    );
}

function useComment() {
    const context = useContext(commentContext);
    if (!context) {
        throw new Error("comment context  scope not defined");
    }
    return context;
}

export { CommentContextProvider, useComment };
