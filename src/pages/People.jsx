import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Box, TextField } from "@mui/material";

import Layout from "../components/layout/Layout";
import FriendCard from "../components/friend/FriendCard";

export default function PeoplePage() {
    const [friends, setFriends] = useState([]);
    const [others, setOthers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios
                .get("/friends", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setFriends(res.data.friends);
                })
                .catch((error) => {
                    console.error(error);
                });

            axios
                .get("/applicants", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setRequests(res.data.requests);
                })
                .catch((error) => {
                    console.error(error);
                });

            axios
                .get("/users", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    let all = res.data.users;
                    setOthers(
                        all
                            .filter(
                                (user) =>
                                    "" + user.id !== localStorage.getItem("id")
                            )
                            .filter(
                                (user) =>
                                    !friends
                                        .map((friend) => friend.id)
                                        .includes(user.id)
                            )
                            .filter(
                                (user) =>
                                    !requests
                                        .map((friend) => friend.id)
                                        .includes(user.id)
                            )
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [requests, friends, others]);

    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <Layout>
            <h1>People</h1>
            <Box
                sx={{
                    maxWidth: "100%",
                    padding: 1,
                }}
            >
                <TextField
                    id="search-input"
                    name="search"
                    label="search users"
                    type={"text"}
                    value={searchInput}
                    onChange={handleInputChange}
                    fullWidth
                />
            </Box>
            <h2>Friends</h2>
            {friends.filter(
                (user) =>
                    user.firstName.includes(searchInput) ||
                    user.lastName.includes(searchInput)
            ).length === 0 ? (
                <p>No friends.</p>
            ) : (
                friends
                    .filter(
                        (user) =>
                            user.firstName.includes(searchInput) ||
                            user.lastName.includes(searchInput)
                    )
                    .map((f) => (
                        <FriendCard
                            key={f.id}
                            user={f}
                            setOthers={setOthers}
                            setRequests={setRequests}
                            setFriends={setFriends}
                            canDelete={true}
                        ></FriendCard>
                    ))
            )}
            <h2>Requests</h2>
            {requests.filter(
                (user) =>
                    user.firstName.includes(searchInput) ||
                    user.lastName.includes(searchInput)
            ).length === 0 ? (
                <p>No requests.</p>
            ) : (
                requests
                    .filter(
                        (user) =>
                            user.firstName.includes(searchInput) ||
                            user.lastName.includes(searchInput)
                    )
                    .map((r) => (
                        <FriendCard
                            key={r.id}
                            user={r}
                            setOthers={setOthers}
                            setRequests={setRequests}
                            setFriends={setFriends}
                            canDelete={true}
                        ></FriendCard>
                    ))
            )}
            <h2>Other people</h2>
            {others.filter(
                (user) =>
                    user.firstName.includes(searchInput) ||
                    user.lastName.includes(searchInput)
            ).length === 0 ? (
                <p>No other people.</p>
            ) : (
                others
                    .filter(
                        (user) =>
                            user.firstName.includes(searchInput) ||
                            user.lastName.includes(searchInput)
                    )
                    .map((r) => (
                        <FriendCard
                            key={r.id}
                            user={r}
                            setOthers={setOthers}
                            setRequests={setRequests}
                            setFriends={setFriends}
                            canDelete={false}
                        ></FriendCard>
                    ))
            )}
        </Layout>
    );
}
