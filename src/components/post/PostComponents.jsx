import axios from "axios";
import React, { useEffect, useState } from "react";

import { Avatar, Grid, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export function PostHeader(props) {
    const [editOpen, setEditOpen] = useState(false);

    const { parentStateSetter } = props;

    let belongsToCurrentUser =
        localStorage.getItem("id") === props.post.owner.id + "";

    useEffect(() => {
        parentStateSetter(editOpen);
    }, [parentStateSetter, editOpen]);

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`/posts/del/${props.post.id}`);
    };

    const handleEdit = (event) => {
        setEditOpen(true);
    };

    return (
        <div>
            <Grid container>
                <Grid item>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item md={0}>
                            <Avatar
                                alt="Remy Sharp"
                                src={props.post.owner.imgUrl}
                            />
                        </Grid>
                        <Grid item md={0}>
                            <Typography variant="h8">
                                {props.post.owner.firstName + " "}
                                {props.post.owner.lastName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row-reverse">
                        {belongsToCurrentUser && (
                            <Grid item>
                                <IconButton
                                    aria-label="delete"
                                    onClick={handleDelete}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        )}
                        {belongsToCurrentUser && (
                            <Grid item>
                                <IconButton
                                    aria-label="edit"
                                    onClick={handleEdit}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export function PostBody(props) {
    return (
        <div>
            <Typography variant="h5" component="div">
                {"[" + props.post.id + "] " + props.post.title}
            </Typography>
            <Typography variant="body2">{props.post.content}</Typography>
            <Typography variant="caption">
                {"on " + new Date(props.post.dateTime).toLocaleString()}
            </Typography>
        </div>
    );
}

export function PostFooter(props) {
    const handleLike = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "/preact",
            data: {
                userId: localStorage.getItem("id"),
                postId: props.post.id,
                reactionId: 1,
            },
        });
    };

    const handleDislike = (event) => {
        event.preventDefault();
        axios.delete(`/preact/p/${props.post.id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
    };

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h8">
                        {props.post.numLikes} likes
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row-reverse">
                        <Grid item>
                            <IconButton
                                aria-label="dislike"
                                onClick={handleDislike}
                            >
                                <ThumbDownIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="like" onClick={handleLike}>
                                <ThumbUpIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
