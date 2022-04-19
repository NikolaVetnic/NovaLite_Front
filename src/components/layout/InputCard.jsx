import axios from "axios";
import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";

export default function BasicCard(props) {
    const defaultValues = {
        title: "",
        content: "",
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
        console.log(localStorage.getItem("token"));

        axios({
            method: "POST",
            url: "http://localhost:9000/posts",
            data: {
                title: formValues.title,
                content: formValues.content,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res.data.post);
                props.setPosts([]);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Card sx={{ minWidth: 275 }} spacing={1}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={1}
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}
                        columns={1}
                        p={2}
                    >
                        <Typography variant="h5" component="div">
                            New Post
                        </Typography>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="title"
                                name="title"
                                label="Post Title"
                                type={"text"}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextareaAutosize
                                id="content"
                                name="content"
                                label="Post Content"
                                aria-label="minimum height"
                                minRows={10}
                                placeholder="Post Content"
                                style={{ width: 200 }}
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
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}
