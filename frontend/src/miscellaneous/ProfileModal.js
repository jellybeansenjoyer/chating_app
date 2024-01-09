import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { IconButton,Button,Image ,Text} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
const ProfileModal = ({user,children}) => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const history = useHistory();
  
  return (
    <>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ) : (
            <IconButton sx={{display:{base:'flex'}}} d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />
        )}
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader
                fontSize="40px"
                fontFamily="Work sans"
                d="flex"
                justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            sx={{display:'flex'}}
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
            />
            <Text
            fontSize={{base:"28px" ,md:"30px"}}
            fontFamily="Work sans"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
