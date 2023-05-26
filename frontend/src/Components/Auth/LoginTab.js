import Login from "./Login"
import SignUp from "./SignUp"
import { Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function LoginTab() {
    return (
        <Tabs height={"max-content"}width={"100%"} padding="20px" backgroundColor={"white"} borderRadius="20px"  isFitted variant='enclosed' >
            <TabList mb='1em'>
                <Tab>Log in</Tab>
                <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel><Login /></TabPanel>
                <TabPanel><SignUp /></TabPanel>
            </TabPanels>
        </Tabs>
    )
}