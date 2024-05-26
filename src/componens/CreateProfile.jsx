import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { isMobilePhone } from "validator";
import { useAuth } from "../context/authContext";
import { createProfileApi } from "../services/userService";
import toast from "react-hot-toast";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    & div {
        margin: 5px;
    }
    & input {
        width: 300px;
    }
    & button {
        margin: 5px;
    }
    & label {
        margin: 5px;
    }
`;

const initialState = {
    name: "",
    phonenumber: "",
    address: "",
};

function CreateProfile() {
    const { userAccount, dispatch } = useAuth();
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const clierrors = {};
    const sererrors = {};

    function runValidations() {
        if (formData.name.trim().length === 0) {
            clierrors.name = "Name is required";
        }
        if (formData.phonenumber.trim().length === 0) {
            clierrors.phonenumber = "Phone number is required";
        } else if (!isMobilePhone(formData.phonenumber, "any")) {
            clierrors.phonenumber = "Invalid phone number";
        }
        if (formData.address.trim().length === 0) {
            clierrors.address = "Address is required";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(clierrors).length === 0) {
            //apicall
            try {
                setIsLoading(true);
                const response = await createProfileApi(formData);
                if (response?.success) {
                    toast.success("profile created sucessfully");
                    dispatch({ type: "SET_PROFILE", payload: response.data });
                } else {
                    if (response.error.length) {
                        response?.error.map((ele) => {
                            sererrors[ele.path] = ele.msg;
                        });
                        setServerErrors(sererrors);
                    } else {
                        toast.error(response.message);
                        setServerErrors(response.message);
                    }
                }
            } catch (error) {
                toast.error("something went wrong");
            } finally {
                setIsLoading(false);
            }
        } else {
            setClientErrors(clierrors);
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <h1>Create Profile</h1>
            <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
            />
            {clientErrors.name && <p>{clientErrors.name}</p>}
            {serverErrors.name && <p>{serverErrors.name}</p>}

            <TextField
                id="outlined-basic"
                label={userAccount.email}
                variant="outlined"
                disabled={true}
            />
            <TextField
                id="outlined-basic"
                label="phonenumber"
                variant="outlined"
                value={formData.phonenumber}
                onChange={(e) =>
                    setFormData({ ...formData, phonenumber: e.target.value })
                }
            />
            {clientErrors.phonenumber && <p>{clientErrors.phonenumber}</p>}
            {serverErrors.phonenumber && <p>{serverErrors.phonenumber}</p>}

            <TextField
                id="outlined-basic"
                label="address"
                variant="outlined"
                value={formData.address}
                onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                }
            />
            {clientErrors.address && <p>{clientErrors.address}</p>}
            {serverErrors.address && <p>{serverErrors.address}</p>}

            <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Registering ... " : "Register"}
            </Button>
        </Container>
    );
}

export default CreateProfile;
