import { Link } from "react-router-dom";
import { usePost } from "../context/postContext";
import CustomTable from "./CustomTable";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
`;

function MyPosts() {
    const { isLoading, myPosts } = usePost();
    return (
        <Container>
            {myPosts.length === 0 && <EmptyPost />}
            {!isLoading && myPosts?.length > 0 && (
                <CustomTable posts={myPosts} />
            )}
        </Container>
    );
}

function EmptyPost() {
    return (
        <div className="emptyList">
            <h2>Your Post List is Empty!!! </h2>
            <Link to="/dashboard">
                <h3>write your first post here</h3>
            </Link>
        </div>
    );
}

export default MyPosts;
