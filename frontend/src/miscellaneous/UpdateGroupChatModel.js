import React from 'react'
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
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    return (
        <>
<IconButton sx={{display:'flex'}} icon={<ViewIcon />} onClick={onOpen}>Open Modal</IconButton>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
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
