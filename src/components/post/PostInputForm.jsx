import axios from "axios";
import React, { useState } from "react";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

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
    description: "Please enter post title and content...",
};

export default function PostInputForm(props) {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = useState({ title: "", content: "" });

    if (props.post && formValues.title === "") {
        formValues.title = props.post.title;
        formValues.content = props.post.content;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "/posts",
            data: {
                title: formValues.title,
                content: formValues.content,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                props.handleUpdatePosts();
            })
            .catch((err) => {
                console.error(err);
                setOpen(true);
            });
        setFormValues({ title: "", content: "" });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: "/posts",
            data: {
                id: props.post.id,
                title: formValues.title,
                content: formValues.content,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                props.handleUpdatePosts();
                props.parentStateSetter(false);
            })
            .catch((err) => {
                console.error(err);
                setOpen(true);
            });
    };

    return (
        <div>
            <form
                onSubmit={
                    props.btnCaption === "Create" ? handleSubmit : handleUpdate
                }
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                            padding: 1,
                        }}
                    >
                        <TextField
                            id="title"
                            name="title"
                            label="Post Title"
                            size="small"
                            type={"text"}
                            value={formValues.title}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                            padding: 1,
                        }}
                    >
                        <TextField
                            id="content"
                            name="content"
                            label="Post Content"
                            multiline
                            maxRows={4}
                            placeholder="Post Content"
                            value={formValues.content}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {props.btnCaption}
                        </Button>
                    </Box>
                </Box>
            </form>
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
}
