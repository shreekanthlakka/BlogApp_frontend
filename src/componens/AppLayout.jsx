import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import AppLayoutHeader from "./AppLayoutHeader";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { usePost } from "../context/postContext";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
    height: 100vh;
`;
const Main = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
    /* align-items: center; */
    height: auto;
    background-color: #f1edec;
    padding-bottom: 8vh;
`;

function AppLayout() {
    const { loggedInUser, userAccount, isAuthenticated, getProfile } =
        useAuth();
    const { getAllPosts, getMyPosts } = usePost();
    const [isFetched, setIsFetched] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            setIsFetched(true);
            Promise.all([getAllPosts(), getMyPosts(), getProfile()])
                .then(() => setIsFetched(false))
                .catch(() => setIsFetched(false));
        })();
    }, []);

    if (isFetched) {
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container>
            <AppLayoutHeader />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Container>
    );
}

export default AppLayout;
