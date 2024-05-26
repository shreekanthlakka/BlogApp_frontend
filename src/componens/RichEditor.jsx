import { Button, TextField } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { usePost } from "../context/postContext";
import toast from "react-hot-toast";

const Container = styled.form`
    margin-top: 20px;
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .input {
        width: 400px;
        border-radius: 5px;
    }
    .ql-editor {
        height: 200px;
    }
    .btn-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
    }
    & button {
        width: 300px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

function RichEditor() {
    true;
    const { createPost, isLoading } = usePost();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    function runValidations() {
        if (title.trim().length === 0) {
            errors.title = "title cannot be empty";
        }
        if (content.trim().length === 0) {
            errors.content = "content cannot be empty";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title || !content) return;
        runValidations();
        if (Object.keys(errors).length === 0) {
            const formData = {
                title,
                content,
            };
            const res = await createPost(formData);
            if (res?.success) {
                toast.success("post created");
                setContent("");
                setTitle("");
            }
            if (!res?.success && res?.status >= 400) {
                toast.error(res.message);
            }
        } else {
            setClientErrors(errors);
        }
    }
    return (
        <Container onSubmit={handleSubmit}>
            <div className="btn-container">
                <FormFields
                    title={title}
                    setTitle={setTitle}
                    clientErrors={clientErrors}
                    content={content}
                    setContent={setContent}
                />
                <Button variant="contained" type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </div>
        </Container>
    );
}

export function FormFields({
    title,
    setTitle,
    clientErrors,
    content,
    setContent,
    selectedPost,
    quillStyles,
}) {
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
    ];

    const module = {
        toolbar: toolbarOptions,
    };

    return (
        <Container>
            <div className="wrapper">
                <TextField
                    label="title"
                    variant="outlined"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={selectedPost?.title}
                    // placeholder="Title"
                />
                {clientErrors?.title && <p>{clientErrors.title}</p>}
                <TextField
                    placeholder="Tags"
                    variant="outlined"
                    label="tags"
                    className="input"
                />
            </div>
            <ReactQuill
                styles={quillStyles}
                modules={module}
                theme="snow"
                value={content}
                onChange={setContent}
                // label="title"
                defaultValue={selectedPost?.content}
            />
            {clientErrors?.content && <p>{clientErrors.content}</p>}
        </Container>
    );
}

export default RichEditor;
