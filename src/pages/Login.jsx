import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Modal,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

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
    title: "Error",
    description: "Invalid login data.",
};

const LoginPage = () => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setOpen(false);
    };

    const defaultValues = {
        username: "",
        password: "",
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
        console.log(formValues);

        axios({
            method: "GET",
            url:
                "/login?username=" +
                formValues.username +
                "&password=" +
                formValues.password,
        })
            .then((res) => {
                localStorage.setItem("token", res.data.jwt);
                navigate("/home");

                axios
                    .get("/user", {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    })
                    .then((res) => {
                        localStorage.setItem("user", res.data.user);
                        // redundantno
                        localStorage.setItem("id", res.data.user.id);
                        // redundantno
                        localStorage.setItem("imgUrl", res.data.user.imgUrl);
                        console.log(res.data);
                        console.log(localStorage.getItem("imgUrl"));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((err) => {
                setOpen(true);
            });
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div style={{ padding: 30 }}>
            <Paper>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={1}
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}
                        p={2}
                    >
                        <h1>Login to SocNet</h1>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="username-input"
                                name="username"
                                label="Username"
                                type={"email"}
                                value={formValues.name}
                                onChange={handleInputChange}
                                style={{ width: 400 }}
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
                                style={{ width: 400 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        label={"Keep me logged in"}
                                        inputProps={{
                                            "aria-label": "primary checkbox",
                                        }}
                                    />
                                }
                                label="Keep me logged in"
                            />
                        </Grid>
                        <Grid item xs="auto" p={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item>
                            <Link href="/register" underline="hover">
                                Not registered yet? Create a new account!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
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
    );
};

export default LoginPage;
