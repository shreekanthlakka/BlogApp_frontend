import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

const Container = styled.div`
    height: 100vh;
`;
const Main = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f1edec;
`;

function Layout() {
    return (
        <Container>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Container>
    );
}

export default Layout;
