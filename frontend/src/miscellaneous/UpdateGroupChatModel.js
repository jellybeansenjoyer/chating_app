import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Box,
    Spinner,
    ModalCloseButton,
    IconButton,
    Input,
    useDisclosure,
    useToast,
    FormControl,
  } from '@chakra-ui/react'
import axios from 'axios';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';
const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [search,setSearch]  = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [renameLoading,setRenameLoading] = useState(false);
    const toast = useToast();
    const {selectedChats,setSelectedChats,user} = ChatState();
    const handleRemove = async (user1) => {
        if(selectedChats.groupAdmin._id!==user._id && user1._id!==user._id){
            toast({
                title:"Only admins can remove someone to the group!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            };
            const {data} = await axios.put("/api/chat/groupremove",{
                chatId:selectedChats._id,
                userId:user1._id
            },config);
            user1._id === user._id ? setSelectedChats() :setSelectedChats(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            }); 
            setLoading(false);
        }
    };
    const handleRename = async () => {
        setRenameLoading(true);
        if(!groupChatName){
            return;
        }

        try{
            const config = {
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const {data} = await axios.put('/api/chat/rename',{
            chatId:selectedChats._id,
            chatName:groupChatName
        },config);
        setSelectedChats(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured!",
                description:error.response.data.message,
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top-left"
            });
            setRenameLoading(false);
        }
        setGroupChatName("");
    };
    const handleSearch = async(query) => {
        setSearch(query)
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            };
            const {data} = await axios.get(`/api/user?search=${search}`,config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title:"Error Occured!",
                description:"Failed to load search results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
        }
    };
    const handleAddUser = async(user1)=>{
        if (selectedChats.users.find((u)=>(
            u._id === user1._id
        ))){
            toast({
                title:"User Already in group!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
        if(selectedChats.groupAdmin._id!==user._id){
            
            toast({
                title:"Only admins can add someone to the group!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            };
            const {data} = await axios.put("/api/chat/groupadd",{
                chatId:selectedChats._id,
                userId:user1._id
            },config);
            setSelectedChats(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            }); 
            setLoading(false);
        }
    };
    return (
        <>
<IconButton sx={{display:'flex'}} icon={<ViewIcon />} onClick={onOpen}>Open Modal</IconButton>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedChats.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Box w="100%" sx={{display:'flex'}} flexWrap="wrap" pb={3}>
            {selectedChats.users.map((u)=>(
                <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleRemove(u)}/>
            ))}
        </Box>
        <FormControl sx={{display:'flex'}}>
            <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e)=>setGroupChatName(e.target.value)}
            />
            <Button
                variant="solid"
                colorScheme='teal'
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
            >Update</Button>
        </FormControl>
        <FormControl>
            <Input placeholder="Add User to group"
                    mb={1}
                    onChange={(e)=>handleSearch(e.target.value)} />
        </FormControl>
        {loading?(<Spinner size="lg"/>):(
            searchResult?.map((user)=>(
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>handleAddUser(user)} />
            ))
        )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
        Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
        </>
  )
}

export default UpdateGroupChatModel
