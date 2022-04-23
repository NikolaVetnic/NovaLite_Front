import axios from "axios";
import React, { useEffect, useState } from "react";

import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export function CommentHeader(props) {
    const [editOpen, setEditOpen] = useState(false);

    const { parentStateSetter } = props;

    let belongsToCurrentUser =
        localStorage.getItem("id") === props.comment.owner.id + "";

    useEffect(() => {
        parentStateSetter(editOpen);
    }, [parentStateSetter, editOpen]);

    const handleDelete = (event) => {
        event.preventDefault();
        axios
            .delete(`/comments/del/${props.comment.id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                props.setPosts([]);
                props.setComments([]);
            });
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
                                src={props.comment.owner.imgUrl}
                            />
                        </Grid>
                        <Grid item md={0}>
                            <Typography variant="h8">
                                {props.comment.owner.firstName + " "}
                                {props.comment.owner.lastName}
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

export function CommentBody(props) {
    return (
        <div>
            <Typography variant="body2">
                {"[" + props.comment.id + "] " + props.comment.content}
            </Typography>
            <Typography variant="caption">
                {"on " + new Date(props.comment.dateTime).toLocaleString()}
            </Typography>
        </div>
    );
}

export function CommentFooter(props) {
    const handleLike = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "/comments/like/",
            data: {
                userId: localStorage.getItem("id"),
                commentId: props.comment.id,
                reactionId: 1,
            },
        }).then(() => {
            props.setPosts([]);
            props.setComments([]);
        });
    };

    const handleDislike = (event) => {
        event.preventDefault();
        axios
            .delete(`/comments/delete/${props.comment.id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                props.setPosts([]);
                props.setComments([]);
            });
    };

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h8">
                        {props.comment.numLikes} likes
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
