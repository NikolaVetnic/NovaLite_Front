import axios from "axios";
import React, { useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { CommentHeader } from "./CommentComponents";

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
    description: "Please enter comment...",
};

export default function CommentInputForm(props) {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = useState({ title: "", content: "" });

    if (props.comment && formValues.content === "") {
        formValues.content = props.comment.content;
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
        let d = {
            content: formValues.content,
            postId: props.post.id,
        };
        console.log(d);
        axios({
            method: "POST",
            url: "/comments",
            data: d,
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                props.setPosts([]);
            })
            .catch((err) => {
                console.error(err);
                setOpen(true);
            });
        setFormValues({ content: "" });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios({
            method: "PUT",
            url: "/comments/update",
            data: {
                id: props.comment.id,
                content: formValues.content,
                ownerId: localStorage.getItem("id"),
                postId: props.comment.postId,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                props.setPosts([]);
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
                    props.btnCaption === "Comment" ? handleSubmit : handleUpdate
                }
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
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
                            label="Comment Content"
                            multiline
                            maxRows={4}
                            placeholder="Comment Content"
                            value={formValues.content}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
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
