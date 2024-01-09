import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../Context/ChatProvider';
const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const [groupChatName,setGroupChatName] = useState();
    const [search,setSearch]  = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,isLoading] = useState(false);
    const [renamLoading,setRenameLoading] = useState(false);
    const toast = useToast();
    const {selectedChats,setSelectedChats,user} = ChatState();
    return (
        <>
<IconButton sx={{display:'flex'}} icon={<ViewIcon />} onClick={onOpen}>Open Modal</IconButton>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedChats.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
        </>
  )
}

export default UpdateGroupChatModel
