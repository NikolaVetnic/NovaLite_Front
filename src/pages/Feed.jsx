import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

import { Grid } from "@mui/material";

import Layout from "../components/layout/Layout";
import PostCard from "../components/post/PostCard";

import { compare_posts } from "./Posts";

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    const wrapperFetchPosts = useCallback(() => {
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
    }, []);

    useEffect(() => {
        wrapperFetchPosts();
    }, [wrapperFetchPosts]);

    const handleUpdatePosts = () => {
        wrapperFetchPosts();
    };

    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    return (
        <div>
            <Layout>
                <h1>Feed Page</h1>
                {posts.length > 0 && (
                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <Grid item xs={12} key={post.id}>
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    setPosts={setPosts}
                                    handleUpdatePosts={handleUpdatePosts}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {posts.length === 0 && (
                    <p>No friends or no friend has posted anything... Yet!</p>
                )}
            </Layout>
        </div>
    );
}
