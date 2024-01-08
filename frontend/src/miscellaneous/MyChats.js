import React,{useEffect, useState} from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, Button, useToast,Text,Stack } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/chatLogics';
const MyChats = () => {
   const [loggedUser,setLoggedUser] = useState();
   const {user,setUser,selectedChats,setSelectedChats,chats,setChats} = ChatState();
   const toast = useToast();
   const fetchChats = async() => {
    try {
        const config = {
            headers:{
                Authorization:`Bearer ${user.token}`,
            },
        };
        const {data} = await axios.get("/api/chat",config);
        console.log(data);
        setChats(data);
    } catch (error) {
        toast({
            title:"Error Occured!",
            description:"Failed to Load the chats",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left"
        });
        return;
    }
   }
   useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
   },[]);
   return (
    <Box d = {{base:selectedChats?"none":"flex",md:"flex"}}
         flexDir="column"
         alignItems="center"
         p={3}
         bg="white"
         w={{base:"100%" , md:"31%"}}
         borderRadius="lg"
         borderWidth="1px">
    <Box
        sx={{display:"flex"}}
        pb={3}
        px={3}
        fontSize={{base:"28px" , md:"30px"}}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
    >
        MyChats
        <Button d="flex" fontSize={{base:"17px" ,md:"10px", lg:"17px"}}
            rightIcon={<AddIcon />}>
                New Group Chat
            </Button>
    </Box>
    <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowX="hidden"
    >
        {
            chats?(
                <Stack overflowY='scroll'>
                    {chats.map((chats)=>(
                        <Box
                            onClick={()=>setSelectedChats(chats)}
                            cursor="pointer"
                            bg={selectedChats===chats?"#38B2AC":"#E8E8E8"}
                            color={selectedChats===chats?"white":"black"}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chats._id}
                        >
                            <Text>
                                {!chats.isGroupChat?(getSender(loggedUser,chats.users)):(chats.chatName)}
                            </Text>
                        </Box>
                    ))}
                </Stack>
            ):(
                <ChatLoading/>
            )
        }
    </Box>
    </Box>
  )
}

export default MyChats
