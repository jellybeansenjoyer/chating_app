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
    ModalCloseButton,
    IconButton,
    Input,
    useDisclosure,
    useToast,
    FormControl,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [search,setSearch]  = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,isLoading] = useState(false);
    const [renameLoading,setRenameLoading] = useState(false);
    const toast = useToast();
    const {selectedChats,setSelectedChats,user} = ChatState();
    const handleRemove = () => {

    };
    const handleRename = () => {

    };
    const handleSearch = () => {

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
