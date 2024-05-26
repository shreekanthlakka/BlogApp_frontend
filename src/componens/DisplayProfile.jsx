import styled from "styled-components";
import { useAuth } from "../context/authContext";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { isMobilePhone } from "validator";
import toast from "react-hot-toast";

const Container = styled.div`
    height: 80vh;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 1.5rem;
    }
    & button {
        margin: 1.5rem;
        width: 6rem;
    }
    .input_box {
        display: flex;
        flex-direction: column;
        margin: 1.5rem;
    }
`;

function DisplayProfile({ profile }) {
    const { userAccount, updateProfile, isLoading } = useAuth();
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: profile.name,
        phonenumber: profile.phonenumber,
        address: profile.address,
    });
    const [clientErrors, setClientErrors] = useState({});
    const clierrors = {};

    function runValidations() {
        if (formData.name.trim().length === 0) {
            clierrors.name = "Name is required";
        }
        if (formData?.phonenumber.trim().length === 0) {
            clierrors.phonenumber = "Phone number is required";
        } else if (!isMobilePhone(formData.phonenumber, "any")) {
            clierrors.phonenumber = "Invalid phone number";
        }
        if (formData.address.trim().length === 0) {
            clierrors.address = "Address is required";
        }
    }

    async function handleUpdateClick() {
        console.log("updated form ==>", formData);
        runValidations();
        if (Object.keys(clierrors).length === 0) {
            //api call
            const res = await updateProfile(formData);
            if (res?.success) {
                toast.success("updated sucessfully");
                setEdit(false);
            }
        } else {
            setClientErrors(clierrors);
        }
    }

    return (
        <Container>
            <div className="profile_info">
                <div>
                    <img src={userAccount?.profilePic.url} alt={profile.name} />
                </div>
                <div>
                    <p>Name : {profile.name}</p>
                    <p>Email : {profile.email}</p>
                    <p>Phonenumber : {profile.phonenumber}</p>
                    <p>Address : {profile.address}</p>
                </div>
            </div>
            <div className="btn">
                <Button
                    variant="contained"
                    onClick={() => {
                        setEdit((e) => !e);
                    }}
                >
                    Update
                </Button>
            </div>
            <SimpleDialog
                open={edit}
                setEdit={setEdit}
                formData={formData}
                setFormData={setFormData}
                handleUpdateClick={handleUpdateClick}
                profile={profile}
                isLoading={isLoading}
            />
        </Container>
    );
}

function SimpleDialog({
    open,
    setEdit,
    formData,
    setFormData,
    handleUpdateClick,
    profile,
    isLoading,
}) {
    return (
        <Dialog onClose={() => setEdit((e) => !e)} open={open}>
            <Container>
                <DialogTitle>Update Form</DialogTitle>
                <TextField
                    className="input_box"
                    id="outlined-basic"
                    label="name"
                    variant="outlined"
                    value={formData.name}
                    defaultValue={profile.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <TextField
                    id="outlined-basic"
                    className="input_box"
                    label="phonenumber"
                    variant="outlined"
                    value={formData.phonenumber}
                    defaultValue={profile.phonenumber}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phonenumber: e.target.value,
                        })
                    }
                />
                <TextField
                    id="outlined-basic"
                    className="input_box"
                    label="address"
                    variant="outlined"
                    value={formData.address}
                    defaultValue={profile.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                    }
                />
                <Button variant="contained" onClick={() => setEdit((e) => !e)}>
                    cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUpdateClick}
                    disabled={isLoading}
                >
                    {isLoading ? "updating ..." : "update"}
                </Button>
            </Container>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default DisplayProfile;
