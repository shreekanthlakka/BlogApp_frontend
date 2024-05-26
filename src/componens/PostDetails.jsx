import { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Dialog } from "@mui/material";
import { useAuth } from "../context/authContext";
import { useComment } from "../context/commentContext";
import PostComment from "./PostComment";
import ListComments from "./ListComments";
import styled from "styled-components";
import toast from "react-hot-toast";
import parser from "html-react-parser";
import PropTypes from "prop-types";
import { FormFields } from "./RichEditor";

const Container = styled.div`
    max-width: 40rem;
    margin-top: 5px;
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .input {
        width: 10rem;
        border-radius: 0.5rem;
        margin: 0px 10px;
    }
    .ql-editor {
        height: 10rem;
    }
    .ql-toolbar {
        margin: 0 10px;
    }
    .ql-formats {
        margin: 0px 10px 0px 0px;
    }
    .btn-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
    }
    & button {
        /* width: 300px; */
        margin: 1rem;
    }
    .btn_container {
        display: flex;
        justify-content: end;
    }
`;

function PostDetails() {
    const { postId } = useParams();
    const { userAccount } = useAuth();
    const { getPostById, selectedPost, deletePostById } = usePost();
    const { getAllCommentsByPostId } = useComment();
    const [edit, setEdit] = useState(false);
    const isOwner = userAccount._id === selectedPost?.authorId?._id;
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    async function handleDeletePost() {
        const res = await deletePostById(postId);
        if (res?.success) {
            toast.success("post deleated sucessfully");
            navigate(-1);
        } else {
            toast.error("something went wrong");
        }
    }
    function handleUpdatePost() {
        setEdit(true);
    }

    useEffect(() => {
        (async () => {
            Promise.all([getPostById(postId), getAllCommentsByPostId(postId)]);
        })();
    }, [postId]);
    return (
        <Container>
            <h2>Title : {selectedPost?.title}</h2>
            <span>Content : {parser(`${selectedPost?.content}`)}</span>

            <div className="btn_container">
                <Button variant="contained" onClick={() => navigate(-1)}>
                    back
                </Button>
                {isOwner && (
                    <>
                        <Button variant="contained" onClick={handleUpdatePost}>
                            update
                        </Button>
                        <SimpleDialog
                            open={edit}
                            setEdit={setEdit}
                            selectedPost={selectedPost}
                            title={title}
                            setTitle={setTitle}
                            content={content}
                        />
                        <Button variant="contained" onClick={handleDeletePost}>
                            delete
                        </Button>
                    </>
                )}
            </div>
            <div>
                <PostComment />
            </div>
            <div>
                <ListComments />
            </div>
        </Container>
    );
}

function SimpleDialog({
    open,
    setEdit,
    title,
    content,
    setContent,
    setTitle,
    selectedPost,
}) {
    return (
        <Dialog
            onClose={() => setEdit((e) => !e)}
            open={open}
            style={{ width: "100%" }}
        >
            <Container>
                <div className="btn-container">
                    <FormFields
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                        selectedPost={selectedPost}
                    />
                </div>
                <Button variant="contained" onClick={() => setEdit((e) => !e)}>
                    cancel
                </Button>
                <Button
                    variant="contained"
                    // onClick={handleUpdateClick}
                    // disabled={isLoading}
                >
                    update
                </Button>
            </Container>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default PostDetails;
