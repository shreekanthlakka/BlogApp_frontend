import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import validator from "validator";
import { registerApi } from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styledMUI("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

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
    username: "",
    email: "",
    password: "",
    profilePic: "",
};

function Register() {
    const [formData, setFormData] = useState(initialState);
    const [serverErrors, setServerErrors] = useState({});
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const sererrors = {};
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function runValidations() {
        if (formData.username.trim().length === 0) {
            errors.username = "name is requited";
        }
        if (formData.email.trim().length === 0) {
            errors.email = "Email is required.";
        } else if (!validator.isEmail(formData.email)) {
            errors.email = "invalid email format";
        }

        if (formData.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (
            formData.password.trim().length < 5 ||
            formData.password.trim().length > 128
        ) {
            errors.password = `invalid password length`;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        console.log("errors ==> ", errors);
        if (Object.keys(errors).length === 0) {
            //apicall
            setIsLoading(true);
            const res = await registerApi(formData);
            setIsLoading(false);
            if (res?.success) {
                toast.success("registered sucessfully");
                setFormData(initialState);
                navigate("/login");
            }
            if (!res?.success && res?.statusCode >= 400) {
                res.error.map((ele) => {
                    sererrors[ele.path] = ele.msg;
                });
                setServerErrors(sererrors);
                console.log("server errors =>", res.errors);
            }
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                value={formData.username}
                onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                }
            />
            {clientErrors.username && <p>{clientErrors.username}</p>}
            {serverErrors.username && <p>{serverErrors.username}</p>}

            <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            {clientErrors.email && <p>{clientErrors.email}</p>}
            {serverErrors.email && <p>{serverErrors.email}</p>}

            <TextField
                id="outlined-basic"
                type="password"
                label="password"
                variant="outlined"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {clientErrors.password && <p>{clientErrors.password}</p>}
            {serverErrors.password && <p>{serverErrors.password}</p>}

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload ProfilePic
                <VisuallyHiddenInput
                    type="file"
                    name="profilePic"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            profilePic: e.target.files[0],
                        })
                    }
                />
            </Button>
            {serverErrors.profilePic && <p>{serverErrors.profilePic}</p>}
            <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Registering ... " : "Register"}
            </Button>
        </Container>
    );
}

export default Register;
