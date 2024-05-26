import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
    .MuiPaper-root {
        margin: 20px 0px;
    }
`;

function CustomTable({ posts }) {
    const navigate = useNavigate();
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Auther Name</TableCell>
                            <TableCell>Author Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    <Link to={`/myposts/${row._id}`}>
                                        {row.title}
                                    </Link>
                                </TableCell>

                                <TableCell>{row.authorId?.username}</TableCell>
                                <TableCell>{row.authorId?.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            navigate(`/myposts/${row._id}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default CustomTable;
