import { useCallback, useState } from "react";

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
                        btnCaption="Update"
                        parentStateSetter={wrapperSetEditOpen}
                        title={"Edit comment [" + props.comment.id + "]"}
                        handleUpdateComments={props.handleUpdateComments}
                    />
                )}
                {!editOpen && (
                    <div>
                        <CommentHeader
                            comment={props.comment}
                            parentState={editOpen}
                            parentStateSetter={wrapperSetEditOpen}
                            handleUpdateComments={props.handleUpdateComments}
                        />
                        <CommentBody comment={props.comment} />
                        <CommentFooter
                            comment={props.comment}
                            handleUpdateComments={props.handleUpdateComments}
                        />
                    </div>
                )}
            </CardFrame>
        </div>
    );
}
