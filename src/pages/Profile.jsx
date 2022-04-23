import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import { compare_posts } from "./Posts";
import Layout from "../components/layout/Layout";
import PostCard from "../components/post/PostCard";

export default function ProfilePage(props) {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [displayMode, setDisplayMode] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({});

    const { userId } = useParams();

    let isOwnPage = localStorage.getItem("id") === userId;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    /*
     * 0 - no connection
     * 1 - request received
     * 2 - request sent
     * 3 - friendship
     */

    const wrapperGetPosts = useCallback(() => {
        axios
            .get("/posts/all/" + userId, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setPosts(res.data.posts.sort(compare_posts));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios
                .get("/user/" + userId, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch((error) => {
                    console.error(error);
                });

            setFormValues({
                firstName: user.firstName,
                lastName: user.lastName,
                imgUrl: user.imgUrl,
            });

            axios
                .get("/connections/" + userId, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    let befriends = res.data.befriends;
                    let ownId = parseInt(localStorage.getItem("id"));

                    if (befriends) {
                        if (befriends.status === 2) {
                            wrapperGetPosts();
                            setDisplayMode(3);
                        } else if (
                            befriends.status === 1 &&
                            befriends.userId0 === ownId
                        ) {
                            setDisplayMode(2);
                        } else if (
                            befriends.status === 1 &&
                            befriends.userId1 === ownId
                        ) {
                            setDisplayMode(1);
                        }
                    } else {
                        setDisplayMode(0);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userId, wrapperGetPosts, user.firstName, user.lastName, user.imgUrl]);

    const handleRequest = (event) => {
        event.preventDefault();

        axios({
            method: "POST",
            url: "/requests",
            data: {
                userId1: userId,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }).then(() => {
            setDisplayMode(2);
        });
    };

    const handleAccept = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "/friendships",
            data: {
                userId1: userId,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }).then(() => {
            wrapperGetPosts();
            setDisplayMode(3);
        });
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {
        axios({
            method: "PUT",
            url: "/users",
            data: {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                imgUrl: formValues.imgUrl,
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });

        handleEditProfile();
    };

    return (
        <div>
            <Layout>
                <Grid
                    container
                    padding={2}
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "350px" }}
                >
                    {/* profile pic */}
                    <Grid item>
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: 300,
                                maxHeight: { xs: 350, md: 350 },
                                maxWidth: { xs: 350, md: 350 },
                                borderRadius: "16px",
                                boxShadow: 3,
                            }}
                            justifyContent="center"
                            alt="profile pic"
                            src={user.imgUrl}
                        />
                    </Grid>
                    {/* edit profile button */}
                    {isOwnPage && !isEditing && (
                        <Grid item>
                            <Button onClick={handleEditProfile}>
                                Edit info
                            </Button>
                        </Grid>
                    )}
                    {/* save profile changes button */}
                    {isOwnPage && isEditing && (
                        <Grid item>
                            <Button onClick={handleSaveChanges}>
                                Save info
                            </Button>
                        </Grid>
                    )}
                    {/* edit profile form */}
                    {isEditing && (
                        <Grid item>
                            <Card
                                sx={{
                                    height: 230,
                                    width: 300,
                                    maxHeight: { xs: 350, md: 350 },
                                    maxWidth: { xs: 350, md: 350 },
                                    borderRadius: "16px",
                                    boxShadow: 3,
                                }}
                            >
                                <CardContent>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <TextField
                                                id="first-name-input"
                                                name="firstName"
                                                label="First Name"
                                                type="text"
                                                defaultValue={user.firstName}
                                                onChange={handleInputChange}
                                                style={{ width: 275 }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="last-name-input"
                                                name="lastName"
                                                label="Last Name"
                                                type="text"
                                                defaultValue={user.lastName}
                                                onChange={handleInputChange}
                                                style={{ width: 275 }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="img-url-input"
                                                name="imgUrl"
                                                label="Image URL"
                                                type="text"
                                                defaultValue={user.imgUrl}
                                                onChange={handleInputChange}
                                                style={{ width: 275 }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    {/* profile info card */}
                    {!isEditing && (
                        <Grid item>
                            <Card
                                sx={{
                                    height: 100,
                                    width: 300,
                                    maxHeight: { xs: 350, md: 350 },
                                    maxWidth: { xs: 350, md: 350 },
                                    borderRadius: "16px",
                                    boxShadow: 3,
                                }}
                            >
                                <CardContent>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item>
                                            <Typography variant="h4">
                                                {user.firstName +
                                                    " " +
                                                    user.lastName}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">
                                                {user.username}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                {/* not own page && no request or friendship */}
                {!isOwnPage && displayMode === 0 && (
                    <div>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={handleRequest}>
                                Send Friend Request
                            </Button>
                        </Grid>
                    </div>
                )}
                {/* not own page && request received */}
                {!isOwnPage && displayMode === 1 && (
                    <div>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={handleAccept}>
                                Accept Friend Request
                            </Button>
                        </Grid>
                    </div>
                )}
                {/* not own page && request sent */}
                {!isOwnPage && displayMode === 2 && (
                    <div>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item>
                                <h2>Friend request sent!</h2>
                            </Grid>
                        </Grid>
                    </div>
                )}
                {/* not own page && friendship */}
                {!isOwnPage && displayMode === 3 && (
                    <div>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                        >
                            <h2>Posts</h2>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                        >
                            {posts.map((post) => (
                                <Grid item xs={12} key={post.id}>
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        setPosts={wrapperGetPosts}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </Layout>
        </div>
    );
}
