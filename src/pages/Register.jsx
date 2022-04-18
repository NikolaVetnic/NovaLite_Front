import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const modalData = {
    userCreated: false,
    title: "",
    description: "",
};

const resetModalData = () => {
    modalData.userCreated = false;
    modalData.title = "";
    modalData.description = "";
};

const RegisterPage = () => {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setOpen(false);
        if (modalData.userCreated) navigate("/login");
        resetModalData();
    };

    const defaultValues = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        image: "",
        roleId: 2,
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = formValues;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            axios({
                method: "POST",
                url: "http://localhost:9000/users",
                data: {
                    username: formValues.username,
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    password: formValues.password,
                    imgUrl: formValues.image,
                    roleId: formValues.roleId,
                },
            })
                .then((res) => {
                    if (res.status === 201) {
                        modalData.userCreated = true;
                        modalData.title = "Account registration successful";
                        modalData.description =
                            "You will now be redirected to the login page...";
                        setOpen(true);
                    }
                })
                .catch((err) => {
                    modalData.title = "Error";
                    modalData.description = "Account registration failed!";
                    setOpen(true);
                });
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <Paper variant="outlined">
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={1}
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}
                        p={2}
                    >
                        <h1>Sign Up</h1>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="username-input"
                                name="username"
                                label="Username"
                                type={"email"}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="first-name-input"
                                name="firstName"
                                label="First Name"
                                type="text"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="last-name-input"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="image-url-input"
                                name="image"
                                label="Profile Pic URL"
                                type={"url"}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="password-input"
                                name="password"
                                label="Password"
                                type={"password"}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="confirm-password-input"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={"password"}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs="auto" p={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <div>
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            align="center"
                        >
                            {modalData.title}
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            align="center"
                        >
                            {modalData.description}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterPage;
