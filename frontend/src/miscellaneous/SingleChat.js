import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box,FormControl,IconButton,Input,Spinner,Text, Toast, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../config/chatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModel from './UpdateGroupChatModel';
import axios from 'axios';
import io from 'socket.io-client';
import './style.css'
import ScrollableChat from './ScrollableChat';
const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;
const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const [scoketConnected,setSocketConnected] = useState(false)
  const {user,selectedChats,setselectedChats} = ChatState();
  const [messages,setMessages] = useState([]);
  const [newMessage,setNewMessage] = useState();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup",user);
    socket.on("connnection",()=>{
        setSocketConnected(true);
    })
  },[]);
  const fetchMessages = async ()=>{
        if(!selectedChats) return;

        try {
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            setLoading(true);
            const {data} = await axios.get(`/api/message/${selectedChats._id}`,config);
            console.log(messages);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat',selectedChats._id);
        } catch (error) {
            toast({
                title:"Error occured!",
                status:"error",
                description:"Failed to send the messages",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });     
        }
  }
  
  const typingHandler = (e) => {
        setNewMessage(e.target.value);
        //typing indicator logic
  };
  const toast = useToast();
  useEffect(()=>{
    fetchMessages();
  },[selectedChats]);
  const sendMessage = async (e)=>{
    if(e.key==="Enter" && newMessage){
        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            };
            setNewMessage("");
            const {data} = await axios.post('/api/message',{
                content:newMessage,
                chatId:selectedChats._id
            },config);

            console.log(data);
            setNewMessage("");
            setMessages([...messages,data]);
        } catch (error) {
            toast({
                title:"Error occured!",
                status:"error",
                description:"Failed to send the messages",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });   

        }
    }
  }
  return (
    <>
        {selectedChats ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            sx={{display:'flex', justifyContent:{base:'space-between'},alignItems:'center'}}
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              sx={{display:{
                base:'flex'
              }}}
              icon={<ArrowBackIcon />}
              onClick={() => setselectedChats("")}
            />
            {messages &&
              (!selectedChats.isGroupChat ? (
                <>
                  {getSender(user, selectedChats.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChats.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChats.chatName.toUpperCase()}
                  <UpdateGroupChatModel
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
                        <Box
                        sx={{display:'flex',
                        flexDir:"column",
                        justifyContent:"flex-end"}}
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
          >
                       {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
            <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
                    </Box>
                </>
            ):(
                <Box sx={{display:'flex'}} d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )
        }
    </>
  )
}

export default SingleChat
