import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";

import Layout from "../components/layout/Layout";
import PostCard from "../components/post/PostCard";

import { compare_posts } from "./Posts";

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios
                .get("/posts/all", {
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
        }
    }, [posts.length]);

    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    if (posts.length > 0) {
        return (
            <Layout>
                <h1>Feed Page</h1>
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item xs={12} key={post.id}>
                            <PostCard
                                key={post.id}
                                post={post}
                                setPosts={setPosts}
                            />
                        </Grid>
                    ))}
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
