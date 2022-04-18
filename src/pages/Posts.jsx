import axios from "axios";
import Layout from "../components/layout/Layout";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Button, Grid } from "@mui/material";
import BasicCard from "../components/layout/BasicCard";
import InputCard from "../components/layout/InputCard";

function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const handleDisplayClick = () => {
                axios
                    .get("http://localhost:9000/posts", {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                        setPosts(res.data.posts);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                console.log(posts.length);
            };

            handleDisplayClick();
        }
    }, [posts.length]);

    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    if (posts.length > 0) {
        return (
            <Layout>
                <h1>Posts Page</h1>
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item xs={12} key={post.id}>
                            <BasicCard
                                key={post.id}
                                title={post.title}
                                content={post.content}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <InputCard />
                    </Grid>
                </Grid>
            </Layout>
        );
    } else {
        return (
            <Layout>
                <h1>Posts Page</h1>
            </Layout>
        );
    }
}

export default PostsPage;
