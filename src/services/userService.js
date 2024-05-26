export const URI = "http://localhost:5000/api/v1";
// export const URI = "https://blogapp-backend-ko6y.onrender.com/api/v1";

const loginApi = async (formData) => {
    try {
        const res = await fetch(`${URI}/users/login`, {
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

const registerApi = async (formData) => {
    try {
        const fd = new FormData();
        fd.append("username", formData.username);
        fd.append("email", formData.email);
        fd.append("password", formData.password);
        fd.append("profilePic", formData.profilePic);

        console.log("IN REGISTER API", formData);
        const res = await fetch(`${URI}/users/register`, {
            method: "POST",
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            body: fd,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const logoutApi = async () => {
    try {
        const res = await fetch(`${URI}/users/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const getCurrentLoggedInUser = async () => {
    try {
        const res = await fetch(`${URI}/users/loggedinuser`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in server  response : ", error);
        return error.message;
    }
};
// getCurrentLoggedInUser().then((res) => console.log(res));

const getProfileApi = async () => {
    try {
        const res = await fetch(`${URI}/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to load profile");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const createProfileApi = async (formData) => {
    try {
        const res = await fetch(`${URI}/profile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.message,
            };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("ERROR in  creating a user's profile : ", error);
    }
};

const updateProfileApi = async (updatedData) => {
    try {
        const res = await fetch(`${URI}/profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.message,
            };
        }
        return await res.json();
    } catch (error) {
        console.log("error while updating  the user profile : ", error);
    }
};

// registerApi("five", "five@gmail.com", "password", "9000012345");

export {
    loginApi,
    registerApi,
    logoutApi,
    getProfileApi,
    getCurrentLoggedInUser,
    createProfileApi,
    updateProfileApi,
};
