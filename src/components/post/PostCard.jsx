import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { PostHeader, PostBody, PostFooter } from "./PostComponents";
import PostInputForm from "./PostInputForm";
import CommentCard from "../comment/CommentCard";
import CommentInputForm from "../comment/CommentInputForm";
import CardFrame from "../layout/CardFrame";

export function compare_comments(a, b) {
    return a.id < b.id ? 1 : -1;
}

export default function Post(props) {
    // the parentState will be set by its child component
    const [editOpen, setEditOpen] = useState(false);
    const [comments, setComments] = useState([]);

    let displayComments = true;

    // make wrapper function to give child
    const wrapperSetEditOpen = useCallback(
        (val) => {
            setEditOpen(val);
        },
        [setEditOpen]
    );

    const wrapperFetchComments = useCallback(() => {
        axios
            .get("/comments/getByPostId/" + props.post.id, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setComments(res.data.comments.sort(compare_comments));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [props.post.id]);

    useEffect(() => {
        wrapperFetchComments();
    }, [wrapperFetchComments]);

    const handleUpdateComments = () => {
        wrapperFetchComments();
    };

    return (
        <CardFrame>
            {editOpen && (
                <PostInputForm
                    post={props.post}
                    setPosts={props.setPosts}
                    setComments={setComments}
                    btnCaption="Update"
                    title={"Edit post [" + props.post.id + "]"}
                />
            )}
            {!editOpen && (
                <div>
                    <PostHeader
                        post={props.post}
                        setPosts={props.setPosts}
                        parentState={editOpen}
                        parentStateSetter={wrapperSetEditOpen}
                    />
                    <PostBody post={props.post} />
                    <PostFooter post={props.post} setPosts={props.setPosts} />
                </div>
            )}
            {displayComments &&
                comments.map((c) => {
                    return (
                        <CommentCard
                            key={c.id}
                            comment={c}
                            setPosts={props.setPosts}
                            setComments={setComments}
                            handleUpdateComments={handleUpdateComments}
                        ></CommentCard>
                    );
                })}
            <div>
                <CardFrame>
                    <CommentInputForm
                        post={props.post}
                        setPosts={props.setPosts}
                        btnCaption="Comment"
                        handleUpdateComments={handleUpdateComments}
                    />
                </CardFrame>
            </div>
        </CardFrame>
    );
}
