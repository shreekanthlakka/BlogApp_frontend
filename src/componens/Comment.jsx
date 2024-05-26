import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useComment } from "../context/commentContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import toast from "react-hot-toast";

const Container = styled.div`
    border: 1px solid black;
    margin: 10px;

    .comment_header {
        height: 40px;
    }
    & div {
        display: flex;
    }
    & p {
        font-size: 1.2rem;
        margin-left: 2rem;
    }
    & button {
        height: 20px;
        align-self: center;
        margin: 10px;
    }
`;

function Comment({ comment }) {
    const { postId } = useParams();
    const { userAccount } = useAuth();
    const { deleteCommentByPostId, isLoading, updateCommentByPostId } =
        useComment();
    const isOwner = comment?.authorId?._id === userAccount?._id;
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async (commentId) => {
        if (!content) return;
        try {
            const res = await updateCommentByPostId(postId, commentId, {
                content,
            });
            if (res.success) {
                toast.success("Comment updated successfully");
            }
        } catch (error) {
            toast.error("comment didnt updated");
        } finally {
            setOpen(false);
        }
    };

    return (
        <Container>
            <div className="comment_header">
                <h4>@{comment?.authorId?.username}</h4>
                {isOwner && (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleClickOpen}
                        >
                            Update
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Update Comment"}
                            </DialogTitle>

                            <DialogContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={2}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={comment?.content}
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button
                                    onClick={() => handleUpdate(comment._id)}
                                    autoFocus
                                >
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Button
                            variant="contained"
                            size="small"
                            disabled={isLoading}
                            onClick={() =>
                                deleteCommentByPostId(postId, comment._id)
                            }
                        >
                            Delete
                        </Button>
                    </>
                )}
            </div>
            <hr />
            <p>{comment?.content}</p>
        </Container>
    );
}

export default Comment;
