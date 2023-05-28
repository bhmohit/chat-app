import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  VStack,
  InputGroup,
  useToast,
} from "@chakra-ui/react";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const postDetails = () => {};
  const submitForm = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Unable to create account.",
        description: "Input all details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Unable to create account.",
        description: "Passwords don't match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    axios({
      method: "post",
      url: "http://localhost:3030/api/user/",
      data: {
        name: name,
        email: email,
        password: password,
        picture: picture,
      },
    })
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        history.push("/chats");
      })
      .catch(function (error) {
        toast({
          title: "Unable to create account.",
          description: "Account already exists",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack spacing={"1.5rem"}>
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="display-pic">
        <FormLabel>Select Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          value={picture}
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <FormControl>
        <Button
          onClick={submitForm}
          style={{
            color: "black",
            background:
              "linear-gradient(163deg, rgba(238,174,202,1) 13%, rgba(148,187,233,1) 87%)",
          }}
          width="100%"
        >
          Sign Up
        </Button>
      </FormControl>
    </VStack>
  );
}
