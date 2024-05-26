import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import styled from "styled-components";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

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
    & button {
        margin-right: 10px;
        height: 40px;
        width: 100px;
        cursor: pointer;
    }
`;

function AppLayoutHeader() {
    const { logout, isLoading } = useAuth();
    const navigate = useNavigate();
    const links = [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/myposts", name: "MyPosts" },
        { path: "/profile", name: "Profile" },
    ];

    async function handleLogout() {
        const res = await logout();
        if (res.success) {
            toast.success("Logged Out");
            navigate("/login");
        }
    }
    return (
        <Container>
            <Logo />
            <div>
                {links.map((ele) => (
                    <Link to={`${ele.path}`} key={ele.path}>
                        {ele.name}
                    </Link>
                ))}

                <Button
                    variant="contained"
                    disabled={isLoading}
                    onClick={handleLogout}
                >
                    {isLoading ? "LoggingOut..." : "Logout"}
                </Button>
                {/* <button disabled={isLoading} onClick={handleLogout}>
                    {isLoading ? "Logging Out..." : "Logout"}
                </button> */}
            </div>
        </Container>
    );
}

export default AppLayoutHeader;
