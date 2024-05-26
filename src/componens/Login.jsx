import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    & div {
        margin: 5px;
    }
    & input {
        width: 300px;
    }
    & button {
        margin: 10px;
    }
    & span {
        color: red;
    }
`;

const initialState = {
    email: "one@gmail.com",
    password: "998877",
};

function Login() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState(null);
    const errors = {};
    const navigate = useNavigate();

    const { login, isLoading } = useAuth();

    function runValidations() {
        if (formData.email.trim().length === 0) {
            errors.email = "Email is required.";
        } else if (!validator.isEmail(formData.email)) {
            errors.email = "invalid email format";
        }
        if (formData.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (
            formData.password.trim().length < 6 ||
            formData.password.trim().length > 20
        ) {
            errors.password = `password should be in between 5 and 20 characters.`;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        console.log("formData ==> ", formData);
        if (Object.keys(errors).length === 0) {
            //api call
            const res = await login(formData);
            if (res?.success) {
                navigate("/dashboard");
                toast.success("loggedin sucessfully");
                setFormData(initialState);
            }
            if (!res?.success && res?.status >= 400) {
                toast.error(res.message);
                setServerErrors(res.error);
            }
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                label="email"
                variant="outlined"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            {clientErrors.email && <span>{clientErrors.email}</span>}

            <TextField
                label="password"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {clientErrors.password && <span>{clientErrors.password}</span>}
            <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Loging In..." : "Login"}
            </Button>
        </Form>
    );
}

export default Login;
