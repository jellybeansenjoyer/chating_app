import React,{useState} from 'react'
import { FormControl,FormLabel,InputRightElement,Button,useToast, useTab } from '@chakra-ui/react';
import {Input,InputGroup} from '@chakra-ui/input'
import {VStack} from '@chakra-ui/layout'
import axios  from 'axios';
const Login = () => {
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const toast = useToast();
    const handleClick = ()=>{
        setShow(!show)
    }
    const submitHandler = async () => {
        setLoading(true)
        if ( !email || !password) { 
            toast({
                title:"Please Enter all the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
                });
                setLoading(false);
                return;
        }
        try{
            const config = {
                headers:{
                    'Content-type':"application/json",
                },
            };
            
            const {data} = await axios.post("/api/user/login",{
                email,password
            },config);
            toast({
                title:"Login Successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
                });
                localStorage.setItem('userInfo',JSON.stringify(data));
                setLoading(false);
        }catch(err){
            toast({
                title:"Error Occured!",
                description:err.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
                });
                console.log(err)
            setLoading(false);
        }
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
        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>Log in</Button>      
        <Button colorScheme='red' width='100%' style={{marginTop:15}} onClick={()=>{ setEmail('guest@example.com'); setPassword('123456')}} variant='solid'>Get Guest Credentials</Button>      

        </FormControl>
        </FormControl>

    </VStack>
  )
}

export default Login
