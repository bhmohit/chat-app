import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  VStack,
  InputGroup,
  useToast
} from '@chakra-ui/react'
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const handleGuestUser = () => {setEmail("this"); setPassword("that") }
  const toast = useToast();
  const attemptLogin = async () => {
    axios({
      method: "post",
      url: "http://localhost:3030/api/user/login",
      data: {
        email: email,
        password: password
      },
    }).then(function (response) {
      if (response) {
        console.log("PASSWORD CORRECT")
      } else {
        toast({
          title: 'Login Unsuccessful',
          description: "Incorrect Credentials",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    });
  }
  return (
    <VStack spacing={'1.5rem'}>
      <FormControl isRequired id='email'>
        <FormLabel>Email</FormLabel>
        <Input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : 'password'} value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <Button onClick={attemptLogin} style={{ color: "black", background: "linear-gradient(163deg, rgba(238,174,202,1) 13%, rgba(148,187,233,1) 87%)" }} width="100%">Login</Button>
      </FormControl>
      <FormControl>
        <Button onClick={handleGuestUser} width="100%">Guest User Credentials</Button>
      </FormControl>
    </VStack>
  )
}