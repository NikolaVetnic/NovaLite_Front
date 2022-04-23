import axios from "axios";
import { useCallback, useState } from "react";

import { Card, CardContent } from "@mui/material";

import { CommentHeader, CommentBody, CommentFooter } from "./CommentComponents";
import CommentInputForm from "./CommentInputForm";
import CardFrame from "../layout/CardFrame";

export default function CommentCard(props) {
    const [editOpen, setEditOpen] = useState(false);

    const wrapperSetEditOpen = useCallback(
        (val) => {
            setEditOpen(val);
        },
        [setEditOpen]
    );

    return (
        <div>
            <CardFrame>
                {editOpen && (
                    <CommentInputForm
                        comment={props.comment}
                        setPosts={props.setPosts}
                        btnCaption="Update"
                        title={"Edit comment [" + props.comment.id + "]"}
                    />
                )}
                {!editOpen && (
                    <div>
                        <CommentHeader
                            comment={props.comment}
                            setPosts={props.setPosts}
                            setComments={props.setComments}
                            parentState={editOpen}
                            parentStateSetter={wrapperSetEditOpen}
                        />
                        <CommentBody comment={props.comment} />
                        <CommentFooter
                            comment={props.comment}
                            setPosts={props.setPosts}
                            setComments={props.setComments}
                        />
                    </div>
                )}
            </CardFrame>
        </div>
    );
}
