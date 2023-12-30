import { FormControl,FormLabel,Input } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import React,{useState} from 'react'

const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [pic,setPic] = useState('');
  return (
    

    <VStack spacing = '5px'>
        <FormControl>
            <FormLabel>
                <Input placeholder="Enter your name" 
                onChange={(e)=>{
                    setName(e.target.value)
                }} />
            </FormLabel>
        </FormControl>
    </VStack>
  )
}

export default Signup
