import { URI } from "./userService";

const createPostApi = async (formData) => {
    try {
        const res = await fetch(`${URI}/posts`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const getAllPostsApi = async () => {
    try {
        const res = await fetch(`${URI}/posts`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const getMyPostsApi = async () => {
    try {
        const res = await fetch(`${URI}/posts/myposts`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const getSinglePostApi = async (id) => {
    try {
        const res = await fetch(`${URI}/posts/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const updatePostApi = async (formData, id) => {
    try {
        const res = await fetch(`${URI}/posts/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const deletePostApi = async (id) => {
    try {
        const res = await fetch(`${URI}/posts/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const createCommentByPostIdApi = async (postId, postObj) => {
    try {
        const res = await fetch(`${URI}/posts/${postId}/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postObj),
        });
        const data = await res.json();
        // console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const getAllCommentByPostIdApi = async (postId) => {
    try {
        const res = await fetch(`${URI}/posts/${postId}/comments`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        // console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const updateCommentByPostIdApi = async (postId, commentId, updatedObj) => {
    try {
        const res = await fetch(
            `${URI}/posts/${postId}/comments/${commentId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedObj),
            }
        );
        const data = await res.json();
        console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const deleteCommentByPostIdApi = async (postId, commentId) => {
    try {
        const res = await fetch(
            `${URI}/posts/${postId}/comments/${commentId}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await res.json();
        console.log("data in res ==>", data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

export {
    createPostApi,
    updatePostApi,
    deletePostApi,
    getAllPostsApi,
    getMyPostsApi,
    getSinglePostApi,
    createCommentByPostIdApi,
    getAllCommentByPostIdApi,
    updateCommentByPostIdApi,
    deleteCommentByPostIdApi,
};
