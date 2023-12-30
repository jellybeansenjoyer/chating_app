import React,{useState} from 'react'
import { FormControl,FormLabel,InputRightElement,Button } from '@chakra-ui/react';
import {Input,InputGroup} from '@chakra-ui/input'
import {VStack} from '@chakra-ui/layout'
const Login = () => {
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleClick = ()=>{
        setShow(!show)
    }
    const submitHandler = () => {

    }
    return (
    <VStack spacing='5px'>    
         <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
            <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input type={show?'text':'password'}
                placeholder="Enter your password" 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <InputRightElement width="4.5rem">
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show?"Hide":"Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler}>Log in</Button>      
        <Button colorScheme='red' width='100%' style={{marginTop:15}} onClick={()=>{ setEmail('guest@example.com'); setPassword('123456')}} variant='solid'>Get Guest Credentials</Button>      

        </FormControl>
        </FormControl>

    </VStack>
  )
}

export default Login
