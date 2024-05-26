import { usePost } from "../context/postContext";
import CustomTable from "./CustomTable";
import styled from "styled-components";

const Container = styled.div``;

function Posts() {
    const { posts } = usePost();
    return (
        <Container>
            <CustomTable posts={posts} />
        </Container>
    );
}

export default Posts;
