import styled from "styled-components";
const Container = styled.div`
    background-color: #b6afae;
    height: 8vh;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #333;
`;

function Footer() {
    return <Container>Footer</Container>;
}

export default Footer;
