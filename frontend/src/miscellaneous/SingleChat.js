import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box,IconButton,Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../config/chatLogics';
import ProfileModal from './ProfileModal';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const {user,selectedChats,setSelectedChats} = ChatState();
  return (
    <>
        {
            selectedChats?(
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        sx={{display:'flex', justifyContent:'space-between'}}
                        justifyContent={{ base: "space-between" }}
                        alignItems="center">
                            <IconButton
                                d={{ base: "flex", md: "none" }}
                                icon={<ArrowBackIcon />}
                             onClick={() => setSelectedChats("")}/>

            {!selectedChats.isGroupChat?(
                <>{getSender(user,selectedChats.users)}
                  <ProfileModal user={getSenderFull(user,selectedChats.users)}/>
                </>
            ):(
                <>
               {selectedChats.chatName.toUpperCase()}
                {/* <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */} 
                </>
            )}
                        </Text>
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
