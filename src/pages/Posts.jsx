import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";

import Layout from "../components/layout/Layout";
import PostCard from "../components/post/PostCard";
import PostInputForm from "../components/post/PostInputForm";
import CardFrame from "../components/layout/CardFrame";

export function compare_posts(a, b) {
    return a.dateTime < b.dateTime ? 1 : a.dateTime > b.dateTime ? -1 : 0;
}

function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios
                .get("/posts", {
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
    }, [posts]);

    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    return (
        <Layout>
            <h1>Posts Page</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CardFrame>
                        <PostInputForm
                            posts={posts}
                            setPosts={setPosts}
                            title="New Post"
                            btnCaption="Create"
                        />
                    </CardFrame>
                </Grid>
                {posts.length === 0 && (
                    <Grid item xs={12}>
                        No posts yet. Write some!
                    </Grid>
                )}
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
}

export default PostsPage;
