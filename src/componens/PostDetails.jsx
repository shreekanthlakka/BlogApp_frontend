import { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/authContext";
import { useComment } from "../context/commentContext";
import PostComment from "./PostComment";
import ListComments from "./ListComments";
import styled from "styled-components";
import toast from "react-hot-toast";
import parser from "html-react-parser";

const Container = styled.div`
    .btn_container {
        display: flex;
        justify-content: end;
    }
    & button {
        margin: 10px;
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
            {/* <FormFields
                selectedPost={selectedPost}
                edit={edit}
                setEdit={setEdit}
            /> */}

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

export default PostDetails;
