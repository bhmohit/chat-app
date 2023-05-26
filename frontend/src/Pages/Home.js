import React from "react";
import LoginTab from "../Components/Auth/LoginTab"
import { Container, Box } from "@chakra-ui/react";


export default function Home() {
    return (
        <Container paddingTop={"5em"}>
            <LoginTab />
        </Container>
    )
}