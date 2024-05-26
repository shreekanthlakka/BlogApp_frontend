import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import { useComment } from "../context/commentContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Container = styled.div`
    min-width: 600px;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    & button {
        margin-top: 20px;
    }
`;

function PostComment() {
    const { postId } = useParams();
    const [comment, setComment] = useState("");
    const { createCommentByPostId, isLoading } = useComment();
    async function handleAddComment() {
        if (!comment && !postId) return;

        const res = await createCommentByPostId(postId, {
            content: comment,
            postId,
        });
        if (res.success) {
            setComment("");
            toast.success("comment posted sucessfully");
        }
    }
    return (
        <Container>
            <TextField
                id="outlined-multiline-static"
                label="comment for above Post ... "
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleAddComment}
                disabled={isLoading}
            >
                {isLoading ? "commenting ... " : "Add comment"}
            </Button>
        </Container>
    );
}

export default PostComment;
