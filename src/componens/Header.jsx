import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import styled from "styled-components";

const Container = styled.div`
    background-color: #b6afae;
    color: black;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & a {
        text-decoration: none;
        margin-right: 30px;
    }
    & h2 {
        margin-left: 30px;
    }
`;

function Header() {
    const location = useLocation();
    const url = location.pathname;
    return (
        <Container>
            <Logo />
            <div>
                {url === "/login" ? (
                    <Link to="/register">Register</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </Container>
    );
}

export default Header;
