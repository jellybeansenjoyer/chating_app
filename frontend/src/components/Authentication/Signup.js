import { FormControl,FormLabel,Button,useToast } from '@chakra-ui/react'
import {Input,InputGroup,InputRightElement} from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import React,{useState} from 'react'

const Signup = () => {
    const [show,setShow] = useState(true);
    const [show2,setShow2] = useState(true);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [pic,setPic] = useState('');
    const toast = useToast();
    const handleClick = ()=>{
        setShow(!show)
    }
    const handleClick2 = ()=>{
        setShow2(!show2)
    }
    const postDetails = (pics)=>{
        setIsLoading(true)
        if(pic===undefined){
        toast({
          title: 'Please Select an Image',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:'bottom',
        });
        return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app-using-mern")
            data.append("cloud_name","dhjoasasx")
            fetch("https://api.cloudinary.com/v1_1/dhjoasasx/image/upload",{
                method:'post',
                body:data,
            }).then((res)=>res.json()).then((data)=>{ 
                console.log(data);
                setPic(data.url.toString());
                setIsLoading(false);
                }).catch((err)=>{
                    console.log(err);
                    setIsLoading(false)
                });
        }else{
            toast({
            title:"Please Select an Image!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",
            });
            setIsLoading(false);
            return;
        }
    }
    const submitHandler = ()=>{

    }
    return (
    

    <VStack spacing = '5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your name" 
                onChange={(e)=>{
                    setName(e.target.value)
                }} />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
        </FormControl>
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
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                <Input type={show2?'text':'password'}
                placeholder="Confirm your password" 
                onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                }} />
                <InputRightElement width="4.5rem">
                    <Button h='1.75rem' size='sm' onClick={handleClick2}>
                        {show2?"Hide":"Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
        </FormControl>
          
        <FormControl id='pic'>
            <FormLabel>Upload your Picture</FormLabel>
            <Input type="file" p={1.5} accept="image/*" onChange={(e)=>postDetails(e.target.files[0])} />
        </FormControl> 
        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler} isLoading={isLoading}>Sign Up</Button>      
    </VStack>
  )
}

export default Signup
